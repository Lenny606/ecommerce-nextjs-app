import React from 'react'
import Stripe from 'stripe'
import db from "@/db/db";
import {notFound} from "next/navigation";

export default async function PurchasePage({params: {id}}: {
    params: { id: string }
}) {
    const stripe = new Stripe(process.env.STRIPE_SECRET)
    const product = await db.product.findUnique(
        {
            where: {
                id: id
            }
        }
    )
    if (!product) {
        return notFound()
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.price,
        currency: "USD",
        metadata: {productId: product.id} //hooks user to product
    })

    if (paymentIntent.client_secret == null){
        throw Error("Stripe failed to create payment intent")
    }


    return (
        <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
    )
}
