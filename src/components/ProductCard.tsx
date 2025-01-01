import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './ui/card'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
    name: string,
    price: number,
    description: string,
    id: string,
    imagePath: string,
}

export function ProductCard({name, price, description, id, imagePath}: ProductCardProps) {

    return (
        <Card className={'flex flex-col overflow-hidden'}>
            <div className={'relative w-full h-full aspect-video'}>
                <Image src={imagePath.replace('public', "")} alt={'img'} fill/>
            </div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{price}</CardDescription>
            </CardHeader>
            <CardContent className={'flex-grow'}>
                {description}
            </CardContent>
            <CardFooter>
                <Button asChild={true} className={'w-full'} size={'lg'}>
                    <Link href={"/products/" + id + "/purchase"}>
                        Purchase
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export function ProductCardSkeleton() {

    return (
        <Card className={'flex flex-col overflow-hidden animate-pulse'}>
            <div className={'relative w-full h-full aspect-video bg-gray-300'}>
                {/*<Image src={imagePath.replace('public',"")} alt={'img'} fill/>*/}
            </div>
            <CardHeader>
                <CardTitle>
                    <div className={'w-3/4 h-6 rounded-full bg-gray-300'}>
                    </div>
                </CardTitle>
                <CardDescription>
                    <div className={'w-3/4 h-6 rounded-full bg-gray-300'}>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className={'flex-grow'}>
                <div className={'w-full h-6 rounded-full bg-gray-300'}>
                </div>
                <div className={'w-full h-6 rounded-full bg-gray-300'}>
                </div>
                <div className={'w-3/4 h-6 rounded-full bg-gray-300'}>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild={true} className={'w-full'} size={'lg'}>
                    {/*<Link href={"/products/" + id + "/purchase"}>*/}
                    {/*    Purchase*/}
                    {/*</Link>*/}
                </Button>
            </CardFooter>
        </Card>
    )
}
