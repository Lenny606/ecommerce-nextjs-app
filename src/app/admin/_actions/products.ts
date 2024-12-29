"use server"
import {z} from 'zod'
import db from "@/db/db";
import fs from 'fs/promises';
import {notFound, redirect} from "next/navigation";
import {unlink} from "node:fs/promises";

const fileSchema = z.instanceof(File, {message: "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith('image/'))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(10),
    price: z.coerce.number().int().min(1),
    image: imageSchema.refine(file => file.size > 0, {message: "required"}),
    file: fileSchema.refine(file => file.size > 0, {message: "required"})
})
const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional()
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
            isAvailable: isAvailable
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

    await Promise.all([
        fs.unlink(product.filePath),
        fs.unlink(product.imagePath)
    ])
}
export async function updateProduct(id: string, prevState: unknown, formData: FormData) {

    //validation
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const product = db.product.findUnique({
        where: {
            id
        }
    })
    if (product === null) {
        return notFound();
    }

    //filesystem
    let filePath = product.filePath
    if (data.file !== null && data.file.size > 0) {
        await unlink(filePath)
        filePath = `products/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
    }
    let imagePath = product.imagePath
    if (data.image !== null && data.image.size > 0) {
        await unlink(imagePath)
        imagePath = `public/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(imagePath, Buffer.from(await data.image.arrayBuffer()))
    }

    await db.product.update({
        where: {
            id
        },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            filePath: filePath,
            imagePath: imagePath
        }
    })
    redirect("admin/products")
}
