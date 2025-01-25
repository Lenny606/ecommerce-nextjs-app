import React from 'react'
import Image from "next/image";
import Stripe from "stripe";
import {notFound} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import db from "@/db/db";


const stripe = new Stripe(process.env.STRIPE_SECRET as string)

export default async function SuccessPage({searchParams}: {
    searchParams: {
        payment_intent: string,
    }
}) {
    const paymnetINtent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    if (paymnetINtent.metadata.productId == null) {
        return notFound()
    }

    const product = await db.product.findUnique({
        where: {
            id: paymnetINtent.metadata.productId
        }
    })
    if (product === null) {
        return notFound()
    }

    const isSuccess = paymnetINtent.status === 'succeeded'

    return (
        <div className={'max-w-5xl w-full mx-auto space-y-8'}>
            {/*product info*/}
            <h1 className={'text-2xl font-bold'}>{isSuccess ? "Success" : "Error"}</h1>
            <div className={'flex gap-4 items-center'}>
                <div className={"aspect-video flex-shrink-0 v-1/3 relative"}>
                    <Image src={"/" + product.imagePath} alt={product.name} fill className={'object-cover'}/>
                </div>
                <h1 className={'text-2xl font-bold'}>
                    {product.name}
                </h1>
                <div className={'text-clamp-3 text-muted-foreground'}>
                    {product.description}
                </div>
                <Button className={'mt-4'} size={'lg'} asChild>
                    {
                        isSuccess
                            ? <a href={`/products/download/${await downloadId(product.id)}`}>
                                Download
                            </a>
                            : <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
                    }
                </Button>
            </div>
        </div>
    )
}

async function downloadId(id: string) {
    return (await db.downloadVerification.create({
        data: {
            productId: id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
        }
    }))
}
