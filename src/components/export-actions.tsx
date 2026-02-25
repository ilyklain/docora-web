"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ExportActionsProps {
    markdown: string;
}

export function ExportActions({ markdown }: ExportActionsProps) {
    const [copied, setCopied] = useState(false);
    const hasContent = markdown.trim().length > 0;

    const handleDownload = useCallback(() => {
        const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
        saveAs(blob, "README.md");
    }, [markdown]);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }, [markdown]);

    return (
        <div className="flex items-center">
            <Separator orientation="vertical" className="h-5 mx-2.5 bg-border/40" />
            <div className="flex items-center gap-0.5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-7 px-2.5 text-[11px] font-medium text-muted-foreground/60 hover:text-foreground hover:bg-[rgba(247_243_227/0.06)] gap-1.5"
                            disabled={!hasContent}
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.12 }}
                                        className="flex items-center gap-1.5"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Copied
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.12 }}
                                        className="flex items-center gap-1.5"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                        Copy
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-[11px]">
                        Copy markdown to clipboard
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDownload}
                            className="h-7 px-2.5 text-[11px] font-medium text-muted-foreground/60 hover:text-foreground hover:bg-[rgba(247_243_227/0.06)] gap-1.5"
                            disabled={!hasContent}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Download
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-[11px]">
                        Download as README.md
                    </TooltipContent>
                </Tooltip>

                <Dialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2.5 text-[11px] font-medium text-muted-foreground/60 hover:text-foreground hover:bg-[rgba(247_243_227/0.06)] gap-1.5"
                                    disabled={!hasContent}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                    Raw
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-[11px]">
                            View raw markdown source
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-3xl max-h-[85vh] p-0">
                        <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/60">
                            <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-md bg-[rgba(247_243_227/0.06)] flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/60"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                </div>
                                <div>
                                    <DialogTitle className="text-sm font-medium">
                                        README.md
                                    </DialogTitle>
                                    <p className="text-[10px] text-muted-foreground/50 font-mono mt-0.5">
                                        {markdown.length.toLocaleString()} characters
                                    </p>
                                </div>
                            </div>
                        </DialogHeader>
                        <ScrollArea className="max-h-[65vh]">
                            <div className="p-6">
                                <pre className="text-[11px] font-mono leading-[1.7] text-foreground/70 whitespace-pre-wrap break-words">
                                    {markdown}
                                </pre>
                            </div>
                        </ScrollArea>
                        <div className="px-6 py-3 border-t border-border/40 flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopy}
                                className="h-7 text-[11px] text-muted-foreground/60 hover:text-foreground gap-1.5"
                            >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                {copied ? "Copied" : "Copy"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDownload}
                                className="h-7 text-[11px] gap-1.5"
                            >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                Download .md
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
