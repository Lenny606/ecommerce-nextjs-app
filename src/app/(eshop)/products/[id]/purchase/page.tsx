import React from 'react'
import Stripe from 'stripe'
import db from "@/db/db";
import {notFound} from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";

export default async function PurchasePage({params}: {
    params: { id: string }
}) {
    const { id } = await params
    const stripe = new Stripe(process.env.STRIPE_SECRET as string)
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
        amount: 1000,
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
