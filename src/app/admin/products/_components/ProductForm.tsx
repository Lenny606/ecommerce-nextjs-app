"use client"
import React, {useState} from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function ProductForm() {
    const [price, setPrice] = useState<number>()

    return (
        <form action={''} className={'space-y-8'}>
            <div className={'space-y-2'}>
                <Label htmlFor={'name'}>Name</Label>
                <Input type={'text'} name={'name'} id={'name'} required={true}></Input>
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'price'}>Price</Label>
                <Input type={'text'} name={'price'} id={'price'} required={true}></Input>
            </div>
            {/*todo format number*/}
            <div className={'text-muted-foreground'}>
                {price || 0 / 100}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'description'}>Desc</Label>
                <Textarea name={'description'} id={'description'} required={true}
                ></Textarea>
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'file'}>File</Label>
                <Input type={'file'} name={'file'} id={'file'} required={true}></Input>
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'image'}>Image</Label>
                <Input type={'file'} name={'image'} id={'image'} required={true}></Input>
            </div>
            <Button type={'submit'}>SAVE</Button>

        </form>
    )
}
