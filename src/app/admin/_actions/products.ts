"use server"
import {z} from 'zod'
import db from "@/db/db";
import fs from 'fs/promises';
import {notFound, redirect} from "next/navigation";

const fileSchema = z.instanceof(File, {message: "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith('image/'))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(10),
    price: z.coerce.number().int().min(1),
    image: imageSchema.refine(file => file.size > 0, {message: "required"}),
    file: fileSchema.refine(file => file.size > 0, {message: "required"})
})


export async function addProduct(prevState: unknown, formData: FormData) {

    //validation
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    //filesystem
    await fs.mkdir('products/', {recursive: true})
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir('public/products', {recursive: true})
    const imagePath = `public/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(imagePath, Buffer.from(await data.image.arrayBuffer()))

    await db.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: 0,
            filePath: filePath,
            imagePath: imagePath,
            isAvailable: false
        }
    })
    redirect("admin/products")
}

export async function toggleProductAvalability(id: string, isAvailable: boolean) {
    await db.product.update({
        where: {
            id: id
        },
        data: {
            isAvailable:isAvailable
        }
    })
}

export async function deleteProduct(id: string) {
   const product = await db.product.delete({
        where: {
            id: id
        }
    })

    if (product === null) {
        return notFound();
    }
}
