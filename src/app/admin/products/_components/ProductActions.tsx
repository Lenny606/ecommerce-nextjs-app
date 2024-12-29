"use client"
import { DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useTransition} from "react";
import {deleteProduct, toggleProductAvalability} from "@/app/admin/_actions/products";

export function ActiveToggleDropDownItem({id, isAvailable}: {
    id: string,
    isAvailable: boolean
}) {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => startTransition(
            async () => {
                await toggleProductAvalability(id , !isAvailable)
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
    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() => startTransition(
                async () => {
                    await deleteProduct (id)
                }
            )}>
            Delete
        </DropdownMenuItem>
    )
}