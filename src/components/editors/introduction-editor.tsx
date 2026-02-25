"use client";

import type { IntroductionData } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface IntroductionEditorProps {
    data: IntroductionData;
    onChange: (data: IntroductionData) => void;
}

export function IntroductionEditor({ data, onChange }: IntroductionEditorProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Project Name</Label>
                <Input
                    value={data.projectName}
                    onChange={(e) => onChange({ ...data, projectName: e.target.value })}
                    placeholder="My Project"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Tagline</Label>
                <Input
                    value={data.tagline}
                    onChange={(e) => onChange({ ...data, tagline: e.target.value })}
                    placeholder="A brief tagline for your project"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Textarea
                    value={data.description}
                    onChange={(e) => onChange({ ...data, description: e.target.value })}
                    placeholder="Describe what your project does and why it exists..."
                    rows={5}
                />
            </div>
        </div>
    );
}
