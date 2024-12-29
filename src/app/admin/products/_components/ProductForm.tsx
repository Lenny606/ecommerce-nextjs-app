"use client"
import React, {useActionState} from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {addProduct} from "@/app/admin/_actions/products";
import {useFormStatus} from "react-dom";

export default function ProductForm() {
    // const [price, setPrice] = useState<number>(0)
    const [error, action] = useActionState(addProduct, {});

    return (
        <form action={action} className={'space-y-8'}>
            <div className={'space-y-2'}>
                <Label htmlFor={'name'}>Name</Label>
                <Input type={'text'} name={'name'} id={'name'} required={true}></Input>
                {
                    error.name && <div className={'text-destructive'}>{error.name}</div>
                }
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'price'}>Price</Label>
                <Input type={'text'} name={'price'} id={'price'} required={true}></Input>
            </div>
            {
                error.price && <div className={'text-destructive'}>{error.price}</div>
            }
            {/*/!*todo format number*!/*/}
            {/*<div className={'text-muted-foreground'}>*/}
            {/*    {price || 0 / 100}*/}
            {/*</div>*/}
            <div className={'space-y-2'}>
                <Label htmlFor={'description'}>Desc</Label>
                <Textarea name={'description'} id={'description'} required={true}
                ></Textarea>
            </div>
            {
                error.description && <div className={'text-destructive'}>{error.description}</div>
            }
            <div className={'space-y-2'}>
                <Label htmlFor={'file'}>File</Label>
                <Input type={'file'} name={'file'} id={'file'} required={true}></Input>
            </div>
            {
                error.file && <div className={'text-destructive'}>{error.file}</div>
            }
            <div className={'space-y-2'}>
                <Label htmlFor={'image'}>Image</Label>
                <Input type={'file'} name={'image'} id={'image'} required={true}></Input>
            </div>
            {
                error.image && <div className={'text-destructive'}>{error.image}</div>
            }
            < SubmitButton/>

        </form>
    )
}

function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <Button type={'submit'} disabled={pending}>
            {pending ? 'Saving...' : 'Save'}
        </Button>
    )

}
