export type SectionId =
    | "introduction"
    | "installation"
    | "usage"
    | "tech-stack"
    | "env-variables"
    | "api-reference"
    | "contributing"
    | "license"
    | "screenshots"
    | "badges"
    | "custom-block";

export interface SectionConfig {
    id: SectionId;
    label: string;
    enabled: boolean;
}

export interface IntroductionData {
    projectName: string;
    tagline: string;
    description: string;
}

export interface InstallationData {
    packageManager: "npm" | "yarn" | "pnpm" | "bun";
    installCommand: string;
    additionalSteps: string;
}

export interface UsageData {
    quickStart: string;
    codeExample: string;
    codeLanguage: string;
}

export interface TechStackItem {
    name: string;
    description: string;
}

export interface TechStackData {
    items: TechStackItem[];
}

export interface EnvVariable {
    name: string;
    description: string;
    required: boolean;
    defaultValue: string;
}

export interface EnvVariablesData {
    variables: EnvVariable[];
}

export interface ApiEndpoint {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    description: string;
    parameters: string;
}

export interface ApiReferenceData {
    baseUrl: string;
    endpoints: ApiEndpoint[];
}

export interface ContributingData {
    guidelines: string;
    codeOfConduct: boolean;
}

export interface LicenseData {
    type: "MIT" | "Apache-2.0" | "GPL-3.0" | "BSD-3-Clause" | "ISC" | "Unlicense";
    year: string;
    author: string;
}

export interface ScreenshotsData {
    items: { alt: string; url: string }[];
}

export interface BadgeItem {
    label: string;
    url: string;
    category?: string;
}

export interface BadgesData {
    items: BadgeItem[];
}

export interface CustomBlockData {
    title: string;
    content: string;
}

export interface ReadmeData {
    introduction: IntroductionData;
    installation: InstallationData;
    usage: UsageData;
    techStack: TechStackData;
    envVariables: EnvVariablesData;
    apiReference: ApiReferenceData;
    contributing: ContributingData;
    license: LicenseData;
    screenshots: ScreenshotsData;
    badges: BadgesData;
    customBlock: CustomBlockData;
}

export type StylePreset = "standard" | "minimal" | "detailed" | "emoji" | "corporate";

export type TemplateId = "saas" | "open-source" | "portfolio" | "api-service";

export interface Template {
    id: TemplateId;
    name: string;
    description: string;
    sections: SectionConfig[];
    data: ReadmeData;
}
