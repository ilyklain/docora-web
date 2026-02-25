"use client";

import type { InstallationData } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface InstallationEditorProps {
    data: InstallationData;
    onChange: (data: InstallationData) => void;
}

export function InstallationEditor({ data, onChange }: InstallationEditorProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Package Manager</Label>
                <Select
                    value={data.packageManager}
                    onValueChange={(v) =>
                        onChange({
                            ...data,
                            packageManager: v as InstallationData["packageManager"],
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="npm">npm</SelectItem>
                        <SelectItem value="yarn">yarn</SelectItem>
                        <SelectItem value="pnpm">pnpm</SelectItem>
                        <SelectItem value="bun">bun</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Install Command</Label>
                <Input
                    value={data.installCommand}
                    onChange={(e) => onChange({ ...data, installCommand: e.target.value })}
                    placeholder={`${data.packageManager} install`}
                    className="font-mono text-xs"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Additional Steps</Label>
                <Textarea
                    value={data.additionalSteps}
                    onChange={(e) => onChange({ ...data, additionalSteps: e.target.value })}
                    placeholder="Any extra setup steps (one per line)..."
                    rows={4}
                />
            </div>
        </div>
    );
}
