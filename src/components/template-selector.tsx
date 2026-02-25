"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { TemplateId } from "@/types";
import { templates } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TemplateSelectorProps {
    activeTemplate: TemplateId | null;
    onSelect: (id: TemplateId) => void;
    onClear: () => void;
}

const templateIcons: Record<TemplateId, React.ReactNode> = {
    saas: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    ),
    "open-source": (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
    ),
    portfolio: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    ),
    "api-service": (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
    ),
};

export function TemplateSelector({
    activeTemplate,
    onSelect,
    onClear,
}: TemplateSelectorProps) {
    return (
        <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 shrink-0"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            <Select
                value={activeTemplate ?? ""}
                onValueChange={(v) => {
                    if (v) onSelect(v as TemplateId);
                }}
            >
                <SelectTrigger className="w-auto min-w-[200px] h-7 text-[11px] border-border/40 bg-[rgba(247_243_227/0.03)] hover:bg-[rgba(247_243_227/0.06)] transition-colors [&_[data-description]]:hidden relative justify-center [&>svg]:absolute [&>svg]:right-3 [&>span]:w-full [&>span]:justify-center [&>span]:pr-3">
                    <SelectValue placeholder="Load a template..." />
                </SelectTrigger>
                <SelectContent align="start" className="w-64">
                    {templates.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="text-[12px] py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                                <div className="text-muted-foreground/50 shrink-0">
                                    {templateIcons[t.id]}
                                </div>
                                <div className="flex flex-col gap-0.5 whitespace-nowrap">
                                    <span className="font-medium text-[12px]">{t.name}</span>
                                    <span data-description className="text-[10px] text-muted-foreground/50 leading-none mt-0.5 whitespace-normal">
                                        {t.description}
                                    </span>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <AnimatePresence>
                {activeTemplate && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClear}
                            className="h-7 px-2 text-[11px] text-muted-foreground/40 hover:text-foreground gap-1"
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            Reset
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
