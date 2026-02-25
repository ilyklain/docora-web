"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface PreviewPanelProps {
    markdown: string;
}

export function PreviewPanel({ markdown }: PreviewPanelProps) {
    const [mode, setMode] = useState<"preview" | "raw">("preview");
    const hasContent = useMemo(() => markdown.trim().length > 0, [markdown]);
    const lineCount = useMemo(() => markdown.split("\n").length, [markdown]);
    const charCount = useMemo(() => markdown.length, [markdown]);

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[rgba(247_243_227/0.01)]">
            <div className="flex items-center justify-between px-4 h-10 border-b border-border/60 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setMode("preview")}
                        className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-100
              ${mode === "preview"
                                ? "text-foreground bg-[rgba(247_243_227/0.07)]"
                                : "text-muted-foreground/40 hover:text-muted-foreground/70"}
            `}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        Preview
                    </button>
                    <button
                        onClick={() => setMode("raw")}
                        className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-100
              ${mode === "raw"
                                ? "text-foreground bg-[rgba(247_243_227/0.07)]"
                                : "text-muted-foreground/40 hover:text-muted-foreground/70"}
            `}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                        Markdown
                    </button>
                </div>
                {hasContent && (
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-muted-foreground/25">
                            {lineCount} lines
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground/25">
                            {charCount.toLocaleString()} chars
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {hasContent ? (
                        mode === "preview" ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.12 }}
                                className="p-5"
                            >
                                <div className="readme-card">
                                    <div className="readme-card-header">
                                        <div className="flex items-center gap-2">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /></svg>
                                            <span className="text-[12px] font-medium text-foreground/70">README.md</span>
                                        </div>
                                    </div>
                                    <div className="readme-card-content markdown-body">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                            {markdown}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="raw"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.12 }}
                                className="p-5"
                            >
                                <div className="readme-card">
                                    <div className="readme-card-header">
                                        <div className="flex items-center gap-2">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                            <span className="text-[12px] font-medium text-foreground/70">Source</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground/30">.md</span>
                                    </div>
                                    <div className="readme-card-content">
                                        <div className="raw-markdown">
                                            {markdown.split("\n").map((line, i) => (
                                                <div key={i} className="raw-line">
                                                    <span className="raw-line-number">{i + 1}</span>
                                                    <span className="raw-line-content">{line || "\u00A0"}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-24 px-8"
                        >
                            <div className="w-16 h-20 rounded-lg border border-dashed border-[rgba(247_243_227/0.08)] flex flex-col items-center justify-center gap-1 mb-5">
                                <div className="w-8 h-0.5 rounded-full bg-[rgba(247_243_227/0.06)]" />
                                <div className="w-6 h-0.5 rounded-full bg-[rgba(247_243_227/0.04)]" />
                                <div className="w-7 h-0.5 rounded-full bg-[rgba(247_243_227/0.05)]" />
                                <div className="w-5 h-0.5 rounded-full bg-[rgba(247_243_227/0.03)]" />
                            </div>
                            <p className="text-[12px] text-muted-foreground/35 font-medium mb-1">Your README will appear here</p>
                            <p className="text-[10px] text-muted-foreground/20 text-center max-w-[220px] leading-relaxed">
                                Start filling in sections or load a template to generate your README in real time.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
