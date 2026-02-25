"use client";

import type { ApiReferenceData, ApiEndpoint } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ApiReferenceEditorProps {
    data: ApiReferenceData;
    onChange: (data: ApiReferenceData) => void;
}

export function ApiReferenceEditor({ data, onChange }: ApiReferenceEditorProps) {
    const addEndpoint = () => {
        onChange({
            ...data,
            endpoints: [
                ...data.endpoints,
                { method: "GET", path: "", description: "", parameters: "" },
            ],
        });
    };

    const updateEndpoint = (
        index: number,
        field: keyof ApiEndpoint,
        value: string
    ) => {
        const updated = data.endpoints.map((ep, i) =>
            i === index ? { ...ep, [field]: value } : ep
        );
        onChange({ ...data, endpoints: updated });
    };

    const removeEndpoint = (index: number) => {
        onChange({
            ...data,
            endpoints: data.endpoints.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Base URL</Label>
                <Input
                    value={data.baseUrl}
                    onChange={(e) => onChange({ ...data, baseUrl: e.target.value })}
                    placeholder="https://api.example.com/v1"
                    className="font-mono text-xs"
                />
            </div>
            <div className="space-y-4">
                {data.endpoints.map((endpoint, index) => (
                    <div
                        key={index}
                        className="p-3 rounded-md border border-border space-y-3"
                    >
                        <div className="flex gap-2">
                            <div className="w-28 space-y-1.5">
                                <Label className="text-xs text-muted-foreground">Method</Label>
                                <Select
                                    value={endpoint.method}
                                    onValueChange={(v) => updateEndpoint(index, "method", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GET">GET</SelectItem>
                                        <SelectItem value="POST">POST</SelectItem>
                                        <SelectItem value="PUT">PUT</SelectItem>
                                        <SelectItem value="PATCH">PATCH</SelectItem>
                                        <SelectItem value="DELETE">DELETE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <Label className="text-xs text-muted-foreground">Path</Label>
                                <Input
                                    value={endpoint.path}
                                    onChange={(e) => updateEndpoint(index, "path", e.target.value)}
                                    placeholder="/users"
                                    className="font-mono text-xs"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEndpoint(index)}
                                className="mt-6 text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                            >
                                ✕
                            </Button>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Description</Label>
                            <Input
                                value={endpoint.description}
                                onChange={(e) =>
                                    updateEndpoint(index, "description", e.target.value)
                                }
                                placeholder="List all users"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Parameters</Label>
                            <Textarea
                                value={endpoint.parameters}
                                onChange={(e) =>
                                    updateEndpoint(index, "parameters", e.target.value)
                                }
                                placeholder="Document the parameters..."
                                rows={2}
                                className="text-xs"
                            />
                        </div>
                    </div>
                ))}
                <Button variant="outline" size="sm" onClick={addEndpoint} className="text-xs">
                    Add Endpoint
                </Button>
            </div>
        </div>
    );
}
