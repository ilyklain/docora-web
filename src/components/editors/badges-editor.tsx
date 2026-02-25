"use client";

import { useState, useMemo } from "react";
import type { BadgesData } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BADGE_CATALOG = [
    { category: "Build", label: "Build Passing", url: "https://img.shields.io/badge/build-passing-brightgreen" },
    { category: "Build", label: "Build Failing", url: "https://img.shields.io/badge/build-failing-red" },
    { category: "Build", label: "Tests Passing", url: "https://img.shields.io/badge/tests-passing-brightgreen" },
    { category: "License", label: "MIT License", url: "https://img.shields.io/badge/license-MIT-blue" },
    { category: "License", label: "Apache 2.0", url: "https://img.shields.io/badge/license-Apache_2.0-blue" },
    { category: "License", label: "GPL 3.0", url: "https://img.shields.io/badge/license-GPL_3.0-blue" },
    { category: "Version", label: "Version 1.0.0", url: "https://img.shields.io/badge/version-1.0.0-orange" },
    { category: "Version", label: "npm Version", url: "https://img.shields.io/npm/v/your-package" },
    { category: "Version", label: "PyPI Version", url: "https://img.shields.io/pypi/v/your-package" },
    { category: "Downloads", label: "npm Downloads", url: "https://img.shields.io/npm/dm/your-package" },
    { category: "Downloads", label: "PyPI Downloads", url: "https://img.shields.io/pypi/dm/your-package" },
    { category: "Coverage", label: "Coverage 100%", url: "https://img.shields.io/badge/coverage-100%25-brightgreen" },
    { category: "Coverage", label: "Coverage 80%", url: "https://img.shields.io/badge/coverage-80%25-yellow" },
    { category: "Tech", label: "TypeScript", url: "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" },
    { category: "Tech", label: "JavaScript", url: "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" },
    { category: "Tech", label: "Python", url: "https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" },
    { category: "Tech", label: "React", url: "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" },
    { category: "Tech", label: "Next.js", url: "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" },
    { category: "Tech", label: "Node.js", url: "https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" },
    { category: "Tech", label: "Rust", url: "https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white" },
    { category: "Tech", label: "Go", url: "https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white" },
    { category: "Tech", label: "Docker", url: "https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" },
    { category: "Social", label: "GitHub Stars", url: "https://img.shields.io/github/stars/user/repo?style=social" },
    { category: "Social", label: "GitHub Forks", url: "https://img.shields.io/github/forks/user/repo?style=social" },
    { category: "Social", label: "Twitter Follow", url: "https://img.shields.io/twitter/follow/username?style=social" },
    { category: "Status", label: "Maintained", url: "https://img.shields.io/badge/maintained-yes-green" },
    { category: "Status", label: "PRs Welcome", url: "https://img.shields.io/badge/PRs-welcome-brightgreen" },
    { category: "Status", label: "Stable", url: "https://img.shields.io/badge/stability-stable-green" },
    { category: "Status", label: "Beta", url: "https://img.shields.io/badge/stability-beta-yellow" },
];

const CATEGORIES = [...new Set(BADGE_CATALOG.map((b) => b.category))];

interface BadgesEditorProps {
    data: BadgesData;
    onChange: (data: BadgesData) => void;
}

export function BadgesEditor({ data, onChange }: BadgesEditorProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredBadges = useMemo(() => {
        let list = BADGE_CATALOG;
        if (activeCategory) list = list.filter((b) => b.category === activeCategory);
        if (search) list = list.filter((b) => b.label.toLowerCase().includes(search.toLowerCase()));
        return list;
    }, [activeCategory, search]);

    const addFromCatalog = (label: string, url: string) => {
        const exists = data.items.some((i) => i.url === url);
        if (!exists) {
            onChange({ items: [...data.items, { label, url }] });
        }
    };

    const addItem = () => {
        onChange({ items: [...data.items, { label: "", url: "" }] });
    };

    const updateItem = (index: number, field: "label" | "url", value: string) => {
        const updated = data.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        onChange({ items: updated });
    };

    const removeItem = (index: number) => {
        onChange({ items: data.items.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPicker(!showPicker)}
                    className="text-xs gap-1.5"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    {showPicker ? "Hide Badge Picker" : "Browse Badges"}
                </Button>
                <Button variant="outline" size="sm" onClick={addItem} className="text-xs gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Custom Badge
                </Button>
            </div>

            {showPicker && (
                <div className="rounded-lg border border-border/40 bg-[rgba(247_243_227/0.015)] overflow-hidden">
                    <div className="p-3 border-b border-border/30">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search badges..."
                            className="h-8 text-xs"
                        />
                    </div>
                    <div className="flex items-center gap-1 px-3 py-2 border-b border-border/20 overflow-x-auto scrollbar-none">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors ${!activeCategory ? "bg-foreground/10 text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground/60"
                                }`}
                        >
                            All
                        </button>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-foreground/10 text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground/60"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 p-3 max-h-[240px] overflow-y-auto">
                        {filteredBadges.map((badge) => {
                            const isAdded = data.items.some((i) => i.url === badge.url);
                            return (
                                <button
                                    key={badge.url}
                                    onClick={() => addFromCatalog(badge.label, badge.url)}
                                    disabled={isAdded}
                                    className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-left transition-colors ${isAdded
                                            ? "opacity-30 cursor-not-allowed"
                                            : "hover:bg-[rgba(247_243_227/0.04)] cursor-pointer"
                                        }`}
                                >
                                    <img
                                        src={badge.url}
                                        alt={badge.label}
                                        className="h-5 shrink-0"
                                        loading="lazy"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                    />
                                    <span className="text-[10px] text-muted-foreground/40 truncate">{badge.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {data.items.length > 0 && (
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground/60">Active Badges</Label>
                    {data.items.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center group">
                            {item.url && (
                                <img
                                    src={item.url}
                                    alt={item.label}
                                    className="h-5 shrink-0"
                                    loading="lazy"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                />
                            )}
                            <Input
                                value={item.label}
                                onChange={(e) => updateItem(index, "label", e.target.value)}
                                placeholder="Label"
                                className="h-7 text-xs w-32"
                            />
                            <Input
                                value={item.url}
                                onChange={(e) => updateItem(index, "url", e.target.value)}
                                placeholder="https://img.shields.io/..."
                                className="h-7 text-xs font-mono flex-1"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(index)}
                                className="text-muted-foreground/30 hover:text-foreground h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
