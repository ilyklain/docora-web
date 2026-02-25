import { useEffect, useRef, useCallback } from "react";
import type { ReadmeData, SectionConfig, StylePreset } from "@/types";

const STORAGE_KEY = "docora_state";

interface PersistedState {
    sections: SectionConfig[];
    data: ReadmeData;
    stylePreset: StylePreset;
    savedAt: number;
}

export function usePersistence(
    sections: SectionConfig[],
    data: ReadmeData,
    stylePreset: StylePreset,
    onRestore: (state: PersistedState) => void
) {
    const isRestoredRef = useRef(false);

    useEffect(() => {
        if (isRestoredRef.current) return;
        isRestoredRef.current = true;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const state: PersistedState = JSON.parse(raw);
            if (state.sections && state.data) {
                onRestore(state);
            }
        } catch { }
    }, [onRestore]);

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const state: PersistedState = { sections, data, stylePreset, savedAt: Date.now() };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch { }
        }, 500);
        return () => clearTimeout(timer);
    }, [sections, data, stylePreset]);

    const clearSaved = useCallback(() => {
        try { localStorage.removeItem(STORAGE_KEY); } catch { }
    }, []);

    return { clearSaved };
}

export function encodeShareState(sections: SectionConfig[], data: ReadmeData, preset: StylePreset): string {
    try {
        const payload = JSON.stringify({ s: sections, d: data, p: preset });
        return btoa(encodeURIComponent(payload));
    } catch {
        return "";
    }
}

export function decodeShareState(encoded: string): { sections: SectionConfig[]; data: ReadmeData; preset: StylePreset } | null {
    try {
        const payload = JSON.parse(decodeURIComponent(atob(encoded)));
        if (payload.s && payload.d) {
            return { sections: payload.s, data: payload.d, preset: payload.p || "standard" };
        }
        return null;
    } catch {
        return null;
    }
}
