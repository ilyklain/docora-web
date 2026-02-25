"use client";

import type { ScreenshotsData } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ScreenshotsEditorProps {
    data: ScreenshotsData;
    onChange: (data: ScreenshotsData) => void;
}

export function ScreenshotsEditor({ data, onChange }: ScreenshotsEditorProps) {
    const addItem = () => {
        onChange({ items: [...data.items, { alt: "", url: "" }] });
    };

    const updateItem = (index: number, field: "alt" | "url", value: string) => {
        const updated = data.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        onChange({ items: updated });
    };

    const removeItem = (index: number) => {
        onChange({ items: data.items.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-4">
            {data.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                    <div className="w-40 space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Alt Text</Label>
                        <Input
                            value={item.alt}
                            onChange={(e) => updateItem(index, "alt", e.target.value)}
                            placeholder="Screenshot title"
                        />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Image URL</Label>
                        <Input
                            value={item.url}
                            onChange={(e) => updateItem(index, "url", e.target.value)}
                            placeholder="https://example.com/screenshot.png"
                            className="font-mono text-xs"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="mt-6 text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                    >
                        ✕
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" onClick={addItem} className="text-xs">
                Add Screenshot
            </Button>
        </div>
    );
}
