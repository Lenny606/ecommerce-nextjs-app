"use server"
import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import db from "@/db/db";
import {Resend} from "resend";
import PurchaseReceipt from "@/email/PurchaseReceipt";

//STRIPE CALLS IF SUCCESSFUL
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {

    const event = stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get('stripe-signature') as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
    )
    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productId = charge.metadata.productId
        const email = charge.billing_details.email
        const price = charge.amount

        const product = await db.product.findUnique({
            where: {
                id: productId
            },
            select: {
                price: true
            }
        })
        if (product == null || email == null) {
            return new NextResponse("Bad request", {status: 40})
        }
        const userFields = {
            email: email,
            orders: {
                create: {
                    productId,
                    price
                }
            }
        }

        const {
            orders: [order]
        } = await db.user.upsert({
            where: {email},
            create: userFields,
            update: userFields,
            select: {
                orders: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 1
                }
            }
        })

        const donwloadID = await db.downloadVerification.create({
            data: {
                productId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }
        })

        await resend.emails.send({
            from: "Support - " + process.env.SENDER_EMAIL,
            to: email,
            subject: "Download link",
            react: "<PurchaseReceipt order={order} product={product} downloadId={donwloadID.productId}/>",
        })
    }

    return new NextResponse("OK")
}