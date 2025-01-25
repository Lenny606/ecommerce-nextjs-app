import React from 'react'
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function ExpiredPage() {
    return (
        <div>
            <h1>Download expired</h1>
            <Button asChild size={'lg'}>
                <Link href={'/orders'}>Get new Link</Link>
            </Button>
        </div>
    )
}
