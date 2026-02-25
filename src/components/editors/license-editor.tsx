"use client";

import type { LicenseData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface LicenseEditorProps {
    data: LicenseData;
    onChange: (data: LicenseData) => void;
}

const licenseOptions: LicenseData["type"][] = [
    "MIT",
    "Apache-2.0",
    "GPL-3.0",
    "BSD-3-Clause",
    "ISC",
    "Unlicense",
];

export function LicenseEditor({ data, onChange }: LicenseEditorProps) {
    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">License Type</Label>
                <Select
                    value={data.type}
                    onValueChange={(v) =>
                        onChange({ ...data, type: v as LicenseData["type"] })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {licenseOptions.map((license) => (
                            <SelectItem key={license} value={license}>
                                {license}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-3">
                <div className="w-24 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Year</Label>
                    <Input
                        value={data.year}
                        onChange={(e) => onChange({ ...data, year: e.target.value })}
                        placeholder="2024"
                    />
                </div>
                <div className="flex-1 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Author</Label>
                    <Input
                        value={data.author}
                        onChange={(e) => onChange({ ...data, author: e.target.value })}
                        placeholder="Your Name or Company"
                    />
                </div>
            </div>
        </div>
    );
}
