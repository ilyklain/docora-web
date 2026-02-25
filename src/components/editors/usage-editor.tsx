"use client";

import type { UsageData } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface UsageEditorProps {
    data: UsageData;
    onChange: (data: UsageData) => void;
}

export function UsageEditor({ data, onChange }: UsageEditorProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Quick Start</Label>
                <Textarea
                    value={data.quickStart}
                    onChange={(e) => onChange({ ...data, quickStart: e.target.value })}
                    placeholder="Brief instructions to get started..."
                    rows={3}
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Code Language</Label>
                <Input
                    value={data.codeLanguage}
                    onChange={(e) => onChange({ ...data, codeLanguage: e.target.value })}
                    placeholder="bash, typescript, python..."
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Code Example</Label>
                <Textarea
                    value={data.codeExample}
                    onChange={(e) => onChange({ ...data, codeExample: e.target.value })}
                    placeholder="npm run dev"
                    rows={6}
                    className="font-mono text-xs"
                />
            </div>
        </div>
    );
}
