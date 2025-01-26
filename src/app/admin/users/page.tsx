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
import {DeleteDropDownItem} from "@/app/admin/users/_components/UserActions";

// export default function AdminProductPage() {
//     return (
//         <>
//             <div className={"flex justify-between px-4"}>
//                 <PageHeader>Products</PageHeader>
//                 <Button asChild>
//                     <Link href={"/admin/products/new"}>Add</Link>
//                 </Button>
//             </div>
//             <ProductTable/>
//         </>
//     )
// }
function getUsers() {
    return db.user.findMany({
        select: {
            id: true,
            email: true,
            orders: {
                select: {
                    price: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export default function UserPage() {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <UserTable/>
        </>
    )
}

async function UserTable() {

    const users = await getUsers()

    if (users.length === 0) {
        return <div>
            <p>No users found.</p>
        </div>
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead
                        className={'w-0'}> <span className={'sr-only'}>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.orders.reduce((sum, o) =>
                                o.price + sum, 0) / 100}</TableCell>
                            <TableCell>{user.orders.length}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical/>
                                        <span className={'sr-only'}>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DeleteDropDownItem id={user.id} disabled={false}/>
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