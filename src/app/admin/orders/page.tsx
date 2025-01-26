import React from 'react'
import PageHeader from "@/app/admin/_components/PageHeader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import db from "@/db/db";
import {MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {DeleteDropDownItem} from "@/app/admin/orders/_components/OrderActions";

function getOrders() {
    return db.order.findMany({
        select: {
            id: true,
            price: true,
            product: {
                select: {
                    name: true
                }
            },
            user: {
                select: {
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export default function OrdersPage() {
    return (
        <>
            <PageHeader>Orders</PageHeader>
            <OrderTable/>
        </>
    )
}

async function OrderTable() {

    const orders = await getOrders()

    if (orders.length === 0) {
        return <div>
            <p>No orders found.</p>
        </div>
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead
                        className={'w-0'}> <span className={'sr-only'}>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.product.name}</TableCell>
                            <TableCell>{order.user.email}</TableCell>
                            <TableCell>{order.price / 100}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical/>
                                        <span className={'sr-only'}>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DeleteDropDownItem id={order.id} disabled={false}/>
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