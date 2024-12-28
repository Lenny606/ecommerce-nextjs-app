import React from 'react'
import PageHeader from "@/app/admin/_components/PageHeader";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function AdminProductPage() {
    return (
        <>
            <div className={"flex justify-between px-4"}>
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    <Link href={"/admin/products/new"} >Add</Link>
                </Button>
            </div>
            <ProductTable/>
        </>
    )
}

function ProductTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={'w-0'}>
                        <span className={'sr-only'}>Available for purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead
                        className={'w-0'}> <span className={'sr-only'}>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}