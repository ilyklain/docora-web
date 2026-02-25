"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionConfig, SectionId, ReadmeData, IntroductionData, InstallationData, UsageData, TechStackData, EnvVariablesData, ApiReferenceData, ContributingData, LicenseData, ScreenshotsData, BadgesData, CustomBlockData } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IntroductionEditor } from "@/components/editors/introduction-editor";
import { InstallationEditor } from "@/components/editors/installation-editor";
import { UsageEditor } from "@/components/editors/usage-editor";
import { TechStackEditor } from "@/components/editors/tech-stack-editor";
import { EnvVariablesEditor } from "@/components/editors/env-variables-editor";
import { ApiReferenceEditor } from "@/components/editors/api-reference-editor";
import { ContributingEditor } from "@/components/editors/contributing-editor";
import { LicenseEditor } from "@/components/editors/license-editor";
import { ScreenshotsEditor } from "@/components/editors/screenshots-editor";
import { BadgesEditor } from "@/components/editors/badges-editor";
import { CustomBlockEditor } from "@/components/editors/custom-block-editor";

interface EditorPanelProps {
    sections: SectionConfig[];
    activeSection: SectionId;
    data: ReadmeData;
    onUpdateData: <K extends keyof ReadmeData>(key: K, value: ReadmeData[K]) => void;
    onSelectSection: (id: SectionId) => void;
}

const sectionDescriptions: Record<SectionId, string> = {
    introduction: "Project name, tagline, and description",
    installation: "Setup instructions and prerequisites",
    usage: "Quick start guide and code examples",
    "tech-stack": "Technologies and frameworks used",
    "env-variables": "Required environment configuration",
    "api-reference": "API endpoints and documentation",
    contributing: "Contribution guidelines and setup",
    license: "License type and copyright info",
    screenshots: "Project screenshots and visuals",
    badges: "Status badges and shields",
    "custom-block": "Freeform markdown content",
};

export function EditorPanel({
    sections,
    activeSection,
    data,
    onUpdateData,
    onSelectSection,
}: EditorPanelProps) {
    const enabledSections = useMemo(
        () => sections.filter((s) => s.enabled),
        [sections]
    );

    const currentSection = useMemo(
        () => sections.find((s) => s.id === activeSection),
        [sections, activeSection]
    );

    const isActive = currentSection?.enabled ?? false;

    const renderEditor = (sectionId: SectionId) => {
        switch (sectionId) {
            case "introduction":
                return (
                    <IntroductionEditor
                        data={data.introduction}
                        onChange={(v: IntroductionData) => onUpdateData("introduction", v)}
                    />
                );
            case "installation":
                return (
                    <InstallationEditor
                        data={data.installation}
                        onChange={(v: InstallationData) => onUpdateData("installation", v)}
                    />
                );
            case "usage":
                return (
                    <UsageEditor
                        data={data.usage}
                        onChange={(v: UsageData) => onUpdateData("usage", v)}
                    />
                );
            case "tech-stack":
                return (
                    <TechStackEditor
                        data={data.techStack}
                        onChange={(v: TechStackData) => onUpdateData("techStack", v)}
                    />
                );
            case "env-variables":
                return (
                    <EnvVariablesEditor
                        data={data.envVariables}
                        onChange={(v: EnvVariablesData) => onUpdateData("envVariables", v)}
                    />
                );
            case "api-reference":
                return (
                    <ApiReferenceEditor
                        data={data.apiReference}
                        onChange={(v: ApiReferenceData) => onUpdateData("apiReference", v)}
                    />
                );
            case "contributing":
                return (
                    <ContributingEditor
                        data={data.contributing}
                        onChange={(v: ContributingData) => onUpdateData("contributing", v)}
                    />
                );
            case "license":
                return (
                    <LicenseEditor
                        data={data.license}
                        onChange={(v: LicenseData) => onUpdateData("license", v)}
                    />
                );
            case "screenshots":
                return (
                    <ScreenshotsEditor
                        data={data.screenshots}
                        onChange={(v: ScreenshotsData) => onUpdateData("screenshots", v)}
                    />
                );
            case "badges":
                return (
                    <BadgesEditor
                        data={data.badges}
                        onChange={(v: BadgesData) => onUpdateData("badges", v)}
                    />
                );
            case "custom-block":
                return (
                    <CustomBlockEditor
                        data={data.customBlock}
                        onChange={(v: CustomBlockData) => onUpdateData("customBlock", v)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-[45%] shrink-0 flex flex-col min-w-0 border-r border-border/60">
            <div className="flex items-center gap-0.5 px-2 h-10 border-b border-border/60 shrink-0 overflow-x-auto scrollbar-none">
                {enabledSections.map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => onSelectSection(section.id)}
                        className={`
              relative px-3 py-1.5 text-[11px] rounded-md transition-all duration-100 whitespace-nowrap font-medium
              ${activeSection === section.id
                                ? "text-foreground bg-[rgba(247_243_227/0.07)]"
                                : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-[rgba(247_243_227/0.03)]"
                            }
            `}
                    >
                        {section.label}
                        {activeSection === section.id && (
                            <motion.div
                                layoutId="editor-tab-indicator"
                                className="absolute bottom-0 left-2 right-2 h-px bg-foreground/20"
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            />
                        )}
                    </button>
                ))}
            </div>
            <ScrollArea className="flex-1">
                <div className="p-8 max-w-2xl">
                    <AnimatePresence mode="wait">
                        {isActive ? (
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-base font-semibold tracking-tight">
                                        {currentSection?.label}
                                    </h2>
                                    <p className="text-[12px] text-muted-foreground/50 mt-1">
                                        {sectionDescriptions[activeSection]}
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    {renderEditor(activeSection)}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="disabled"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 gap-3"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[rgba(247_243_227/0.04)] flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/30"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-[13px] text-muted-foreground/50 font-medium">Section Disabled</p>
                                    <p className="text-[11px] text-muted-foreground/30 mt-1">Enable this section from the sidebar to start editing.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}
