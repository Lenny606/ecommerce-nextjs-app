import React from 'react'

type CheckoutProps = {
    product: object
    clientSecret: string
}

export default function CheckoutForm({product, clientSecret}: CheckoutProps) {
    return (
        <div>CheckoutForm</div>
    )
}
