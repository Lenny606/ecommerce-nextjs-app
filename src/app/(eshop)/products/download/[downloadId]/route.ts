import {NextRequest, NextResponse} from "next/server";
import db from "@/db/db";
import fs from "fs/promises";

export async function GET(req: NextRequest, {params: {downloadId}}: {
                              params: {
                                  downloadId: string
                              }
                          }
) {
    const data = await db.downloadVerification.findUnique({
        where: {
            id: downloadId,
            expiresAt: {
                gt: new Date()
            }
        },
        select: {
            product: {
                select: {
                    name: true,
                    filePath: true
                }
            }
        }
    })

    if (data === null) {
        return NextResponse.redirect(new URL("/products/donwload/expired",req.url))
    }

    const {size} = await fs.stat(data.product.filePath)
    const file = await fs.readFile(data.product.filePath)
    const extension = data.product.filePath.split('.').pop()

    return new NextResponse(file, {
        headers: {
            'Content-Disposition': `attachment; filename="${data.product.name}.${extension}"`,
            'Content-Length': size.toString()
        }
    })

}