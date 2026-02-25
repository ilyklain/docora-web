"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import type { SectionConfig, SectionId } from "@/types";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SectionManagerProps {
    sections: SectionConfig[];
    activeSection: SectionId;
    onToggle: (id: SectionId) => void;
    onReorder: (sections: SectionConfig[]) => void;
    onSelect: (id: SectionId) => void;
}

const sectionIcons: Record<SectionId, React.ReactNode> = {
    introduction: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6z" /></svg>
    ),
    badges: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
    installation: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
    ),
    usage: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    "tech-stack": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></svg>
    ),
    "env-variables": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M17 12h.01" /><path d="M7 12h.01" /></svg>
    ),
    "api-reference": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    ),
    contributing: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
    ),
    license: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
    screenshots: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
    ),
    "custom-block": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
    ),
};

export function SectionManager({
    sections,
    activeSection,
    onToggle,
    onReorder,
    onSelect,
}: SectionManagerProps) {
    const handleDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) return;
            const items = Array.from(sections);
            const [moved] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, moved);
            onReorder(items);
        },
        [sections, onReorder]
    );

    const enabledCount = sections.filter((s) => s.enabled).length;

    return (
        <aside className="w-60 border-r border-border/60 shrink-0 flex flex-col bg-[rgba(247_243_227/0.015)]">
            <div className="px-4 py-3 border-b border-border/60">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">
                        Sections
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/40">
                        {enabledCount}/{sections.length}
                    </span>
                </div>
            </div>
            <ScrollArea className="flex-1">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="p-2 space-y-0.5"
                            >
                                <AnimatePresence initial={false}>
                                    {sections.map((section, index) => (
                                        <Draggable
                                            key={section.id}
                                            draggableId={section.id}
                                            index={index}
                                        >
                                            {(dragProvided, snapshot) => (
                                                <motion.div
                                                    ref={dragProvided.innerRef}
                                                    {...dragProvided.draggableProps}
                                                    layout
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                >
                                                    <div
                                                        className={`
                              flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer
                              transition-all duration-100 group relative
                              ${activeSection === section.id && section.enabled
                                                                ? "bg-[rgba(247_243_227/0.07)] shadow-[inset_0_0_0_1px_rgba(247_243_227/0.06)]"
                                                                : "hover:bg-[rgba(247_243_227/0.035)]"}
                              ${snapshot.isDragging ? "bg-[rgba(247_243_227/0.07)] shadow-md" : ""}
                              ${!section.enabled ? "opacity-40" : ""}
                            `}
                                                        onClick={() => {
                                                            if (section.enabled) onSelect(section.id);
                                                        }}
                                                    >
                                                        <div
                                                            {...dragProvided.dragHandleProps}
                                                            className="flex items-center opacity-0 group-hover:opacity-30 transition-opacity shrink-0"
                                                        >
                                                            <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                                                                <circle cx="4" cy="3" r="0.9" />
                                                                <circle cx="8" cy="3" r="0.9" />
                                                                <circle cx="4" cy="6" r="0.9" />
                                                                <circle cx="8" cy="6" r="0.9" />
                                                                <circle cx="4" cy="9" r="0.9" />
                                                                <circle cx="8" cy="9" r="0.9" />
                                                            </svg>
                                                        </div>
                                                        <div className={`shrink-0 transition-colors ${activeSection === section.id && section.enabled
                                                            ? "text-foreground/80"
                                                            : "text-muted-foreground/50"
                                                            }`}>
                                                            {sectionIcons[section.id]}
                                                        </div>
                                                        <span
                                                            className={`text-[12.5px] flex-1 select-none leading-none ${section.enabled
                                                                ? activeSection === section.id
                                                                    ? "text-foreground font-medium"
                                                                    : "text-foreground/70"
                                                                : "text-muted-foreground/50"
                                                                }`}
                                                        >
                                                            {section.label}
                                                        </span>
                                                        <Switch
                                                            checked={section.enabled}
                                                            onCheckedChange={() => onToggle(section.id)}
                                                            className="scale-[0.65] origin-right opacity-0 group-hover:opacity-100 transition-opacity data-[state=checked]:opacity-100"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </Draggable>
                                    ))}
                                </AnimatePresence>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ScrollArea>
            <div className="px-4 py-3 border-t border-border/40">
                <p className="text-[10px] text-muted-foreground/30 leading-relaxed">
                    Drag to reorder · Toggle to include
                </p>
            </div>
        </aside>
    );
}
