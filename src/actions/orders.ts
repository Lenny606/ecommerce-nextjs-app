'use server'
import {z} from 'zod'
import db from "@/db/db";
import {Resend} from "resend";

const emailSchema = z.string().email()
const resend = new Resend(process.env.RESEND_API_KEY as string)

export default async function emailOrderHistory(prevState: unknown, form: FormData):
    Promise<{ message?: string, error?: string }> {
    const result = emailSchema.safeParse(form.get("email"))

    if (!result.success) {
        return {error: "Invalid email"}
    }

    const user = await db.user.findUnique({
        where: {
            email: result.data
        },
        select: {
            email: true,
            orders: {
                select: {
                    id: true,
                    productId: true,
                    price: true,
                    createdAt: true
                }
            }
        }
    })

    if (!user) {
        return {error: "No user found"}
    }

    const orders = user.orders.map(order => ({
        ...order,
        downloadId: db.downloadVerification.create({
            data: {
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                productId: order.product.id
            }
        })
    }))

    const email = resend.emails.send({
        from: "",
        to: user.email,
        subject: "Your order history",
        react: "<OrderHistory>"
    })

    if (email.error) {
        return {error: "Email failed"}
    }

    return {message: ""}

}