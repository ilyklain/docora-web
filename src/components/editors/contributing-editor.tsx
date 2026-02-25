"use client";

import type { ContributingData } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ContributingEditorProps {
    data: ContributingData;
    onChange: (data: ContributingData) => void;
}

export function ContributingEditor({ data, onChange }: ContributingEditorProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Contribution Guidelines</Label>
                <Textarea
                    value={data.guidelines}
                    onChange={(e) => onChange({ ...data, guidelines: e.target.value })}
                    placeholder="Describe how others can contribute to the project..."
                    rows={8}
                />
            </div>
            <div className="flex items-center gap-3">
                <Switch
                    checked={data.codeOfConduct}
                    onCheckedChange={(v) => onChange({ ...data, codeOfConduct: v })}
                />
                <Label className="text-xs text-muted-foreground">Include Code of Conduct reference</Label>
            </div>
        </div>
    );
}
