import db from "@/db/db";
import {Product} from "@prisma/client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {ProductCard, ProductCardSkeleton} from "@/components/ProductCard";
import {Suspense} from "react";
import {cache} from "@/lib/cache";

async function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

export default async function HomePAge() {

    const getNewProducts = cache(() => {

            return db.product.findMany({
                where: {
                    isAvailable: true
                },
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }
        ,
        ['/', 'getNewProducts'], {revalidate: 60 * 60 * 24}
    )

    const getPopularProducts = cache(() => {
        // await wait(5000)
        return db.product.findMany({
            where: {
                isAvailable: true
            },
            take: 5,
            orderBy: {
                orders: {
                    _count: 'desc'
                }
            }
        })
    }, ["/", "getPopularProducts"], {revalidate: 60 * 60 * 24})

    return (
        <main className={'space-y-12'}>
            <ProductGrid title={'New Products'} productsFetcher={getNewProducts}/>
            <ProductGrid title={'Popular Products'} productsFetcher={getPopularProducts}/>
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