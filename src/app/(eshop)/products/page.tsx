import db from "@/db/db";
import {Product} from "@prisma/client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {ProductCard, ProductCardSkeleton} from "@/components/ProductCard";
import {Suspense} from "react";

async function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
export default async function ProductsPage() {

    async function getProducts() {
        await wait(1000)
        return db.product.findMany({
            where: {
                isAvailable: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
    }

    return (
        <main className={'space-y-12'}>
            <ProductGrid title={'All Products'} productsFetcher={getProducts}/>

        </main>
    );
}

type ProductsFetcherProps = {
    title: string,
    productsFetcher: () => Promise<Product[]>
}


export async function ProductGrid({productsFetcher, title}: ProductsFetcherProps) {


    return (
        <div className={'space-y-4'}>
            <div className={'flex gap-4'}>
                <h2 className={'text-3xl font-bold'}>
                    {title}
                </h2>
                <Button variant={'outline'} asChild>
                    <Link href={'/products'} className={'space-x-2'}>
                        <span>View All</span>
                        <ArrowRight className={'size-4'}/>
                    </Link>
                </Button>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                <Suspense
                    fallback={<>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                    </>}>

                    <ProductSuspense productsFetcher={productsFetcher}/>
                </Suspense>
            </div>
        </div>
    )
}

export async function ProductSuspense({productsFetcher}: { productsFetcher: () => Promise<Product[]> }) {
    const data = await productsFetcher()
    return (

        data.map((product) => {
                return (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                )
            }
        )

    )
}