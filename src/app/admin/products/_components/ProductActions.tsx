"use client"
import { DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useTransition} from "react";
import {deleteProduct, toggleProductAvalability} from "@/app/admin/_actions/products";
import {useRouter} from "next/navigation";

export function ActiveToggleDropDownItem({id, isAvailable}: {
    id: string,
    isAvailable: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => startTransition(
            async () => {
                await toggleProductAvalability(id , !isAvailable)
                router.refresh()
            }
        )}>
            {
                isAvailable? 'Make unavailable' : 'Make available'
            }

        </DropdownMenuItem>
    )
}

export function DeleteDropDownItem({id, disabled}:{id: string, disabled: boolean}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() => startTransition(
                async () => {
                    await deleteProduct (id)
                    router.refresh()
                }
            )}>
            Delete
        </DropdownMenuItem>
    )
}