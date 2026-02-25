"use client";

import type { EnvVariablesData, EnvVariable } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EnvVariablesEditorProps {
    data: EnvVariablesData;
    onChange: (data: EnvVariablesData) => void;
}

export function EnvVariablesEditor({ data, onChange }: EnvVariablesEditorProps) {
    const addVariable = () => {
        onChange({
            variables: [
                ...data.variables,
                { name: "", description: "", required: false, defaultValue: "" },
            ],
        });
    };

    const updateVariable = (
        index: number,
        field: keyof EnvVariable,
        value: string | boolean
    ) => {
        const updated = data.variables.map((v, i) =>
            i === index ? { ...v, [field]: value } : v
        );
        onChange({ variables: updated });
    };

    const removeVariable = (index: number) => {
        onChange({ variables: data.variables.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-4">
            {data.variables.map((variable, index) => (
                <div
                    key={index}
                    className="p-3 rounded-md border border-border space-y-3"
                >
                    <div className="flex gap-2">
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Variable Name</Label>
                            <Input
                                value={variable.name}
                                onChange={(e) => updateVariable(index, "name", e.target.value)}
                                placeholder="DATABASE_URL"
                                className="font-mono text-xs"
                            />
                        </div>
                        <div className="flex-[2] space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Description</Label>
                            <Input
                                value={variable.description}
                                onChange={(e) => updateVariable(index, "description", e.target.value)}
                                placeholder="PostgreSQL connection string"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Default Value</Label>
                            <Input
                                value={variable.defaultValue}
                                onChange={(e) => updateVariable(index, "defaultValue", e.target.value)}
                                placeholder="—"
                                className="font-mono text-xs"
                            />
                        </div>
                        <div className="flex items-center gap-2 pb-1.5">
                            <Switch
                                checked={variable.required}
                                onCheckedChange={(v) => updateVariable(index, "required", v)}
                                className="scale-75"
                            />
                            <Label className="text-xs text-muted-foreground">Required</Label>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeVariable(index)}
                            className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                        >
                            ✕
                        </Button>
                    </div>
                </div>
            ))}
            <Button variant="outline" size="sm" onClick={addVariable} className="text-xs">
                Add Variable
            </Button>
        </div>
    );
}
