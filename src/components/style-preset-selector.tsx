"use client";

import type { StylePreset } from "@/types";

interface StylePresetSelectorProps {
    active: StylePreset;
    onChange: (preset: StylePreset) => void;
}

const presets: { id: StylePreset; label: string; desc: string }[] = [
    { id: "standard", label: "Standard", desc: "Clean and balanced" },
    { id: "minimal", label: "Minimal", desc: "Compact, no separators" },
    { id: "detailed", label: "Detailed", desc: "Extra sections & steps" },
    { id: "emoji", label: "Emoji", desc: "Section emojis" },
    { id: "corporate", label: "Corporate", desc: "Centered, formal" },
];

export function StylePresetSelector({ active, onChange }: StylePresetSelectorProps) {
    return (
        <div className="flex items-center gap-0.5">
            {presets.map((p) => (
                <button
                    key={p.id}
                    onClick={() => onChange(p.id)}
                    title={p.desc}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${active === p.id
                            ? "bg-foreground/10 text-foreground"
                            : "text-muted-foreground/30 hover:text-muted-foreground/60 hover:bg-[rgba(247_243_227/0.03)]"
                        }`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}
