import React from 'react'
import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "@/app/admin/products/_components/ProductForm";

export default function NewProductPage() {
    return (
        <>
            <PageHeader>Product New</PageHeader>
            <ProductForm />
        </>
    )
}
