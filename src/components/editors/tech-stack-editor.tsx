"use client";

import type { TechStackData, TechStackItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TechStackEditorProps {
    data: TechStackData;
    onChange: (data: TechStackData) => void;
}

export function TechStackEditor({ data, onChange }: TechStackEditorProps) {
    const addItem = () => {
        onChange({
            items: [...data.items, { name: "", description: "" }],
        });
    };

    const updateItem = (index: number, field: keyof TechStackItem, value: string) => {
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
                    <div className="flex-1 space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Technology</Label>
                        <Input
                            value={item.name}
                            onChange={(e) => updateItem(index, "name", e.target.value)}
                            placeholder="React"
                        />
                    </div>
                    <div className="flex-[2] space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Description</Label>
                        <Input
                            value={item.description}
                            onChange={(e) => updateItem(index, "description", e.target.value)}
                            placeholder="UI framework"
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
                Add Technology
            </Button>
        </div>
    );
}
