"use client"
import {ComponentProps} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export default function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathName = usePathname()
    return (
        <Link {...props} className={cn('p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground', pathName === props.href && "bg-background text-foreground")}/>
    );
}
