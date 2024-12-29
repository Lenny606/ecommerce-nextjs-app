"use client"
import React, {useActionState, useState} from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {addProduct, updateProduct} from "@/app/admin/_actions/products";
import {useFormStatus} from "react-dom";
import {Product} from "@prisma/client";
import Image from "next/image";

export default function ProductForm({product}: { product?: Product | null }) {
    const [price, setPrice] = useState<number | undefined>(product?.price)
    const [error, action] = useActionState(
        product === null ? addProduct : updateProduct.bind(null, product.id), {});

    return (
        <form action={action} className={'space-y-8'}>
            <div className={'space-y-2'}>
                <Label htmlFor={'name'}>Name</Label>
                <Input type={'text'} name={'name'} id={'name'} required={true} defaultValue={product?.name}></Input>
                {
                    error.name && <div className={'text-destructive'}>{error.name}</div>
                }
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'price'}>Price</Label>
                <Input type={'text'} name={'price'} id={'price'} required={true} defaultValue={product?.price}></Input>
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
                <Textarea name={'description'} id={'description'} required={true} defaultValue={product?.description}
                ></Textarea>
            </div>
            {
                error.description && <div className={'text-destructive'}>{error.description}</div>
            }
            <div className={'space-y-2'}>
                <Label htmlFor={'file'}>File</Label>
                <Input type={'file'} name={'file'} id={'file'} required={product === null}></Input>
            </div>
            {
                product !== null && (
                    <p className={'text-muted-foreground'}>{product.filePath}</p>
                )
            }
            {
                error.file && <div className={'text-destructive'}>{error.file}</div>
            }
            <div className={'space-y-2'}>
                <Label htmlFor={'image'}>Image</Label>
                <Input type={'file'} name={'image'} id={'image'} required={product === null}></Input>
            </div>
            {
                product !== null && (
                    <Image src={"/"+ product.imagePath} alt={'image'} height={400} width={400}/>
                )
            }
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
