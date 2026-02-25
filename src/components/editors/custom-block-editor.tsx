"use client";

import type { CustomBlockData } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CustomBlockEditorProps {
    data: CustomBlockData;
    onChange: (data: CustomBlockData) => void;
}

export function CustomBlockEditor({ data, onChange }: CustomBlockEditorProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Section Heading</Label>
                <Input
                    value={data.title}
                    onChange={(e) => onChange({ ...data, title: e.target.value })}
                    placeholder="e.g. Roadmap, FAQ, Acknowledgments..."
                />
            </div>
            <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Content (Markdown supported)</Label>
                <Textarea
                    value={data.content}
                    onChange={(e) => onChange({ ...data, content: e.target.value })}
                    placeholder="Write freeform markdown content here..."
                    className="min-h-[200px] font-mono text-xs leading-relaxed"
                />
            </div>
        </div>
    );
}
