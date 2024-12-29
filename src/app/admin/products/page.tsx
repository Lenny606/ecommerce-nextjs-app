import React from 'react'
import PageHeader from "@/app/admin/_components/PageHeader";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import db from "@/db/db";
import {CheckCircle2, MoreVertical, XCircle} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ActiveToggleDropDownItem, DeleteDropDownItem} from "@/app/admin/products/_components/ProductActions";

export default function AdminProductPage() {
    return (
        <>
            <div className={"flex justify-between px-4"}>
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    <Link href={"/admin/products/new"}>Add</Link>
                </Button>
            </div>
            <ProductTable/>
        </>
    )
}

async function ProductTable() {

    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            isAvailable: true,
            _count: {
                select: {
                    orders: true
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    })

    if (products.length === 0) {
        return <div>
            <p>No products found.</p>
        </div>
    }
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
            <TableBody>
                {
                    products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>{product.isAvailable ? (<>
                                <CheckCircle2/><span className={'sr-only'}>Available</span></>) : (
                                <XCircle/>)}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price / 100}</TableCell>
                            <TableCell>{product._count.orders}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical/>
                                        <span className={'sr-only'}>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            {/*    API */}
                                            <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                        </DropdownMenuItem>
                                       <ActiveToggleDropDownItem id={product.id} isAvailable={product.isAvailable} />
                                        <DeleteDropDownItem id={product.id} disabled={product._count.orders > 0} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}