"use client";

import { useState } from "react";
import type { ReadmeData, SectionConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GitHubImportProps {
    onImport: (data: Partial<ReadmeData>, sections: SectionConfig[]) => void;
}

interface RepoInfo {
    name: string;
    description: string;
    language: string;
    license: { spdx_id: string } | null;
    topics: string[];
    stargazers_count: number;
    html_url: string;
    default_branch: string;
}

function parseRepoUrl(input: string): { owner: string; repo: string } | null {
    const cleaned = input.trim().replace(/\/$/, "");
    const ghMatch = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (ghMatch) return { owner: ghMatch[1], repo: ghMatch[2].replace(/\.git$/, "") };
    const parts = cleaned.split("/");
    if (parts.length === 2 && !cleaned.includes(" ")) return { owner: parts[0], repo: parts[1] };
    return null;
}

function mapLicense(spdxId: string): ReadmeData["license"]["type"] {
    const map: Record<string, ReadmeData["license"]["type"]> = {
        "MIT": "MIT", "Apache-2.0": "Apache-2.0", "GPL-3.0-only": "GPL-3.0",
        "GPL-3.0-or-later": "GPL-3.0", "BSD-3-Clause": "BSD-3-Clause", "ISC": "ISC", "Unlicense": "Unlicense",
    };
    return map[spdxId] || "MIT";
}

export function GitHubImport({ onImport }: GitHubImportProps) {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImport = async () => {
        const parsed = parseRepoUrl(url);
        if (!parsed) { setError("Invalid GitHub URL or owner/repo format"); return; }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
            if (!res.ok) throw new Error("Repository not found");
            const repo: RepoInfo = await res.json();

            let installCmd = "";
            let pkgManager: ReadmeData["installation"]["packageManager"] = "npm";
            try {
                const pkgRes = await fetch(
                    `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${repo.default_branch}/package.json`
                );
                if (pkgRes.ok) {
                    const pkg = await pkgRes.json();
                    installCmd = `npm install ${pkg.name || repo.name}`;
                }
            } catch { }

            const techItems = [];
            if (repo.language) techItems.push({ name: repo.language, description: "Primary language" });
            repo.topics?.slice(0, 6).forEach((t) => {
                techItems.push({ name: t, description: "" });
            });

            const partialData: Partial<ReadmeData> = {
                introduction: {
                    projectName: repo.name,
                    tagline: repo.description || "",
                    description: repo.description || "",
                },
                installation: {
                    packageManager: pkgManager,
                    installCommand: installCmd,
                    additionalSteps: "",
                },
                techStack: { items: techItems },
                license: {
                    type: repo.license ? mapLicense(repo.license.spdx_id) : "MIT",
                    year: new Date().getFullYear().toString(),
                    author: parsed.owner,
                },
                badges: {
                    items: [
                        { label: "Stars", url: `https://img.shields.io/github/stars/${parsed.owner}/${parsed.repo}?style=flat` },
                        { label: "License", url: `https://img.shields.io/github/license/${parsed.owner}/${parsed.repo}` },
                        ...(repo.language ? [{ label: "Language", url: `https://img.shields.io/github/languages/top/${parsed.owner}/${parsed.repo}` }] : []),
                    ],
                },
            };

            const sections: SectionConfig[] = [
                { id: "introduction", label: "Introduction", enabled: true },
                { id: "badges", label: "Badges", enabled: true },
                { id: "installation", label: "Installation", enabled: !!installCmd },
                { id: "usage", label: "Usage", enabled: true },
                { id: "tech-stack", label: "Tech Stack", enabled: techItems.length > 0 },
                { id: "env-variables", label: "Environment Variables", enabled: false },
                { id: "api-reference", label: "API Reference", enabled: false },
                { id: "contributing", label: "Contributing", enabled: true },
                { id: "license", label: "License", enabled: !!repo.license },
                { id: "screenshots", label: "Screenshots", enabled: false },
                { id: "custom-block", label: "Custom Block", enabled: false },
            ];

            onImport(partialData, sections);
            setOpen(false);
            setUrl("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to import");
        } finally {
            setLoading(false);
        }
    };

    if (!open) {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className="text-xs text-muted-foreground/50 hover:text-foreground gap-1.5 h-8"
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                Import from GitHub
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Input
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(""); }}
                placeholder="github.com/user/repo or user/repo"
                className="h-8 text-xs w-56 font-mono"
                onKeyDown={(e) => e.key === "Enter" && handleImport()}
            />
            <Button
                size="sm"
                onClick={handleImport}
                disabled={loading || !url.trim()}
                className="h-8 text-xs gap-1.5"
            >
                {loading ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" className="animate-spin"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 70" /></svg>
                ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                )}
                Import
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setOpen(false); setError(""); }} className="h-8 w-8 p-0 text-muted-foreground/40">
                ✕
            </Button>
            {error && <span className="text-[10px] text-red-400">{error}</span>}
        </div>
    );
}
