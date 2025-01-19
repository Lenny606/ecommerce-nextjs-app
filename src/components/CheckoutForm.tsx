"use client"
import React from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

type CheckoutProps = {
    product: object
    clientSecret: string
}

export default function CheckoutForm({product, clientSecret}: CheckoutProps) {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)

    return (
        <div className={'max-w-5xl w-full mx-auto space-y-8'}>
            {/*//ELement is kind of context wrapper*/}
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <Form/>
            </Elements>
        </div>

    )
}

export function Form() {
    const stripe = useStripe() //gets instance
    const elements = useElements()
    return <PaymentElement/>
}