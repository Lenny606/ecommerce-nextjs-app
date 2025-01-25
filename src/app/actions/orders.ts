"use server"

import db from "@/db/db"

export async function userOrderCheck(productId: string, email: string) {
    return (await db.order.findFirst({
        where: {
            user: {email},
            productId: {productId}
        },
        select: {
            id: true
        }
    }))
}