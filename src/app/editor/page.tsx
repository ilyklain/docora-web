"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionConfig, ReadmeData, TemplateId, SectionId, StylePreset } from "@/types";
import { defaultSections, defaultData } from "@/lib/defaults";
import { templates } from "@/lib/templates";
import { buildMarkdown } from "@/lib/markdown";
import { usePersistence, encodeShareState, decodeShareState } from "@/lib/persistence";
import { TopBar } from "@/components/top-bar";
import { SectionManager } from "@/components/section-manager";
import { EditorPanel } from "@/components/editor-panel";
import { PreviewPanel } from "@/components/preview-panel";
import { ExportActions } from "@/components/export-actions";
import { TemplateSelector } from "@/components/template-selector";
import { StylePresetSelector } from "@/components/style-preset-selector";
import { GitHubImport } from "@/components/github-import";

export default function EditorPage() {
    const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
    const [data, setData] = useState<ReadmeData>(defaultData);
    const [activeSection, setActiveSection] = useState<SectionId>("introduction");
    const [activeTemplate, setActiveTemplate] = useState<TemplateId | null>(null);
    const [stylePreset, setStylePreset] = useState<StylePreset>("standard");
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [showShareToast, setShowShareToast] = useState(false);

    const markdown = useMemo(
        () => buildMarkdown(sections, data, stylePreset),
        [sections, data, stylePreset]
    );

    const handleRestore = useCallback((state: { sections: SectionConfig[]; data: ReadmeData; stylePreset: StylePreset }) => {
        setSections(state.sections);
        setData(state.data);
        setStylePreset(state.stylePreset);
    }, []);

    const { clearSaved } = usePersistence(sections, data, stylePreset, handleRestore);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        const shared = params.get("s");
        if (shared) {
            const decoded = decodeShareState(shared);
            if (decoded) {
                setSections(decoded.sections);
                setData(decoded.data);
                setStylePreset(decoded.preset);
                window.history.replaceState({}, "", "/editor");
            }
        }
    }, []);

    const handleToggleSection = useCallback((id: SectionId) => {
        setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
        );
    }, []);

    const handleReorderSections = useCallback((reordered: SectionConfig[]) => {
        setSections(reordered);
    }, []);

    const handleUpdateData = useCallback(<K extends keyof ReadmeData>(
        key: K,
        value: ReadmeData[K]
    ) => {
        setData((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleSelectTemplate = useCallback((templateId: TemplateId) => {
        const template = templates.find((t) => t.id === templateId);
        if (!template) return;
        setActiveTemplate(templateId);
        setSections(template.sections.map((s) => ({ ...s })));
        setData(JSON.parse(JSON.stringify(template.data)));
        setActiveSection(template.sections[0]?.id ?? "introduction");
    }, []);

    const handleClearTemplate = useCallback(() => {
        setActiveTemplate(null);
        setSections(defaultSections.map((s) => ({ ...s })));
        setData(JSON.parse(JSON.stringify(defaultData)));
        setActiveSection("introduction");
        clearSaved();
    }, [clearSaved]);

    const handleGitHubImport = useCallback((partialData: Partial<ReadmeData>, importSections: SectionConfig[]) => {
        setData((prev) => ({ ...prev, ...partialData }));
        setSections(importSections);
        setActiveTemplate(null);
        setActiveSection("introduction");
    }, []);

    const handleShare = useCallback(() => {
        const encoded = encodeShareState(sections, data, stylePreset);
        const url = `${window.location.origin}/editor?s=${encoded}`;
        navigator.clipboard.writeText(url).then(() => {
            setShareUrl(url);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        });
    }, [sections, data, stylePreset]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            <TopBar>
                <div className="flex items-center gap-2">
                    <GitHubImport onImport={handleGitHubImport} />
                    <div className="w-px h-5 bg-border/30" />
                    <TemplateSelector
                        activeTemplate={activeTemplate}
                        onSelect={handleSelectTemplate}
                        onClear={handleClearTemplate}
                    />
                    <div className="w-px h-5 bg-border/30" />
                    <StylePresetSelector active={stylePreset} onChange={setStylePreset} />
                    <div className="w-px h-5 bg-border/30" />
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium text-muted-foreground/40 hover:text-foreground hover:bg-[rgba(247_243_227/0.04)] transition-all"
                        title="Copy share link"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                        Share
                    </button>
                    <ExportActions markdown={markdown} />
                </div>
            </TopBar>

            <AnimatePresence>
                {showShareToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-foreground text-background text-[12px] font-medium shadow-lg"
                    >
                        Share link copied to clipboard
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-1 overflow-hidden">
                <SectionManager
                    sections={sections}
                    activeSection={activeSection}
                    onToggle={handleToggleSection}
                    onReorder={handleReorderSections}
                    onSelect={setActiveSection}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTemplate ?? "default"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex flex-1 overflow-hidden"
                    >
                        <EditorPanel
                            sections={sections}
                            activeSection={activeSection}
                            data={data}
                            onUpdateData={handleUpdateData}
                            onSelectSection={setActiveSection}
                        />
                        <PreviewPanel markdown={markdown} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
