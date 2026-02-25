import type { ReadmeData, SectionConfig } from "@/types";

export const defaultSections: SectionConfig[] = [
    { id: "introduction", label: "Introduction", enabled: true },
    { id: "badges", label: "Badges", enabled: false },
    { id: "installation", label: "Installation", enabled: true },
    { id: "usage", label: "Usage", enabled: true },
    { id: "tech-stack", label: "Tech Stack", enabled: true },
    { id: "env-variables", label: "Environment Variables", enabled: false },
    { id: "api-reference", label: "API Reference", enabled: false },
    { id: "contributing", label: "Contributing", enabled: true },
    { id: "license", label: "License", enabled: true },
    { id: "screenshots", label: "Screenshots", enabled: false },
    { id: "custom-block", label: "Custom Block", enabled: false },
];

export const defaultData: ReadmeData = {
    introduction: {
        projectName: "",
        tagline: "",
        description: "",
    },
    installation: {
        packageManager: "npm",
        installCommand: "",
        additionalSteps: "",
    },
    usage: {
        quickStart: "",
        codeExample: "",
        codeLanguage: "bash",
    },
    techStack: {
        items: [],
    },
    envVariables: {
        variables: [],
    },
    apiReference: {
        baseUrl: "",
        endpoints: [],
    },
    contributing: {
        guidelines: "",
        codeOfConduct: true,
    },
    license: {
        type: "MIT",
        year: new Date().getFullYear().toString(),
        author: "",
    },
    screenshots: {
        items: [],
    },
    badges: {
        items: [],
    },
    customBlock: {
        title: "",
        content: "",
    },
};
