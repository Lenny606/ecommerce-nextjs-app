import {NextRequest, NextResponse} from "next/server";

export async function middleware(req: NextRequest) {

    if (!await isAuthenticated(req)) {
        return new NextResponse("Unauthorized", {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic'  //built in browser
            }
        })
    }
}

export async function isAuthenticated(req: NextRequest) {

    const header = req.headers.get('authorization') || req.headers.get('Authorization')

    if (header == null) {
        return false
    }

    const [user, password] = Buffer.from(header.split(' ')[1], 'base64').toString().split(':')

    const pass = await isValidPass(password, process.env.HASHED_PASSWORD as string)

    console.log(user)
    console.log(process.env.USER)
    if (user == process.env.USER && pass) {
        console.log(user == process.env.USER)
        return true
    }
}

export async function isValidPass(password: string, hashedPassword: string) {
    //compare password with hashed password
    if (hashedPassword === await hash(password)) {

        return true
    }
}

export async function hash(password: string) {
    //hash password
    const arrBuffer = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(password))
    return Buffer.from(arrBuffer).toString('base64')
}


export const config = {
    matcher: '/admin/:path*',
}