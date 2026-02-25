import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface TopBarProps {
    children?: ReactNode;
}

export function TopBar({ children }: TopBarProps) {
    return (
        <header className="flex items-center justify-between px-5 h-14 border-b border-border/60 bg-[rgba(247_243_227/0.015)] shrink-0 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1.5">
                    <span className="text-[13px] font-semibold tracking-tight text-foreground">Docora</span>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">v1.0</span>
                </div>
                <Separator orientation="vertical" className="h-5 mx-1 bg-border/40" />
                <span className="text-[11px] text-muted-foreground/70 hidden sm:inline">Editor Panel</span>
            </div>
            {children}
        </header>
    );
}
