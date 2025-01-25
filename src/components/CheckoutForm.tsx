"use client"
import React, {FormEvent, useState} from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {userOrderCheck} from "@/app/actions/orders";

type CheckoutProps = {
    product: {
        id: string,
        imagePath: string,
        name: string,
        price: number
        description: string
    }
    clientSecret: string
}

export default function CheckoutForm({product, clientSecret}: CheckoutProps) {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)

    return (
        <div className={'max-w-5xl w-full mx-auto space-y-8'}>
            {/*product info*/}
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
            </div>
            {/*//ELement is kind of context wrapper*/}
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <Form price={product.price}/>
            </Elements>
        </div>

    )
}

export function Form({price, productId}: { price: number, productId: string }) {
    const stripe = useStripe() //gets instance
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [email, setEmail] = useState<string>('')


    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        if (!stripe || !elements || !email) {
            return
        }

        //check for order in action
        const exists = await userOrderCheck(productId, email)

        if (exists) {
            setErrorMessage("You have already purchased this product");
            setIsLoading(false)
            return
        }


        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.PUBLIC_NEXT_RETURN_URL}/stripe/success`,
                // payment_method: {
                //     card: elements.getElement('card')
                // }
            }
        }).then(({error}) => {
            if (error.type === "card_error" || error.type === "validation_error") {
                setErrorMessage("" + error.message)
            } else {
                setErrorMessage("generic error: " + error.message)
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {
                        errorMessage && <CardDescription className={'text-destructive'}>{errorMessage}</CardDescription>
                    }
                </CardHeader>
                <CardContent>
                    <PaymentElement/>
                    {/*    STRIPE COMPONENT */}
                    <div className={'mt-4'}>
                        <LinkAuthenticationElement
                            onChange={(e) => setEmail(e.value.email)}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className={'w-full'}
                            size={'lg'}
                            disabled={stripe == null || elements == null || isLoading}
                    > {isLoading ? "Purchasing ... " : `Purchase - ${price} USD`} </Button>
                </CardFooter>
            </Card>
        </form>
    )
}