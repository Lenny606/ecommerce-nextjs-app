import {ReactNode} from "react";

export default function Nav({children}: { children: ReactNode }) {
    return (
        <nav className={'flex justify-center px-4 bg-primary text-primary-foreground'}>
            {children}
        </nav>
    );
}
