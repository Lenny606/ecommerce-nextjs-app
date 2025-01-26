'use client'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useFormState, useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import emailOrderHistory from "@/actions/orders";

export default function OrderPage() {
    const [data, action] = useFormState(emailOrderHistory, {})

    return (
        <form action={action}>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        <p>Enter email</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor={'email'}>Email</Label>
                        <Input type={'email'} required={true} name={'email'} id={'email'}></Input>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton/>
                </CardFooter>
            </Card>
        </form>
    )
}

function SubmitButton() {
    const {pending} = useFormStatus()

    return (
        <Button
            className={'w-full'}
            size={'lg'}
            disabled={pending}
            type={'submit'}
        >{pending ? "Sending..." : "Send"}</Button>
    )
}