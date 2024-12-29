import React from 'react'
import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "@/app/admin/products/_components/ProductForm";
import db from "@/db/db";

export default async function EditProductPage({params: {id}}: {
                                            params: {
                                                id: string
                                            }
                                        }
) {

    const product = await db.product.findUnique({
        where: {
            id: id
        }
    })

    return (

        <>
            <PageHeader>Product Edit</PageHeader>
            <ProductForm product={product}/>
                </>
                )
            }
