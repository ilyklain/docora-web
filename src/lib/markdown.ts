import type { ReadmeData, SectionConfig, SectionId, StylePreset } from "@/types";

const emoji: Record<string, Record<string, string>> = {
    standard: { install: "", usage: "", tech: "", env: "", api: "", contrib: "", license: "", screenshots: "" },
    emoji: {
        install: "🚀 ", usage: "💡 ", tech: "🛠️ ", env: "🔐 ", api: "📡 ",
        contrib: "🤝 ", license: "📄 ", screenshots: "📸 ",
    },
    minimal: { install: "", usage: "", tech: "", env: "", api: "", contrib: "", license: "", screenshots: "" },
    detailed: { install: "", usage: "", tech: "", env: "", api: "", contrib: "", license: "", screenshots: "" },
    corporate: { install: "", usage: "", tech: "", env: "", api: "", contrib: "", license: "", screenshots: "" },
};

function e(preset: StylePreset, key: string): string {
    return emoji[preset]?.[key] ?? "";
}

function generateIntroduction(data: ReadmeData["introduction"], preset: StylePreset): string {
    const lines: string[] = [];
    if (preset === "corporate" && data.projectName) {
        lines.push(`<div align="center">`);
        lines.push(`\n# ${data.projectName}`);
        if (data.tagline) lines.push(`\n**${data.tagline}**`);
        lines.push(`\n</div>`);
        if (data.description) lines.push(`\n${data.description}`);
    } else {
        if (data.projectName) lines.push(`# ${data.projectName}`);
        if (data.tagline) lines.push(`\n> ${data.tagline}`);
        if (data.description) {
            if (preset === "detailed") {
                lines.push(`\n## About\n\n${data.description}`);
            } else {
                lines.push(`\n${data.description}`);
            }
        }
    }
    return lines.join("\n");
}

function generateBadges(data: ReadmeData["badges"]): string {
    if (data.items.length === 0) return "";
    const lines = data.items
        .filter((b) => b.label && b.url)
        .map((b) => `![${b.label}](${b.url})`);
    return lines.join(" ");
}

function generateInstallation(data: ReadmeData["installation"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### Installation" : `## ${e(preset, "install")}Installation`;
    const lines: string[] = [heading];
    const cmd = data.installCommand || `${data.packageManager} install`;
    lines.push(`\n\`\`\`bash\n${cmd}\n\`\`\``);
    if (data.additionalSteps) lines.push(`\n${data.additionalSteps}`);
    return lines.join("\n");
}

function generateUsage(data: ReadmeData["usage"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### Usage" : `## ${e(preset, "usage")}Usage`;
    const lines: string[] = [heading];
    if (data.quickStart) lines.push(`\n${data.quickStart}`);
    if (data.codeExample) {
        const lang = data.codeLanguage || "bash";
        lines.push(`\n\`\`\`${lang}\n${data.codeExample}\n\`\`\``);
    }
    return lines.join("\n");
}

function generateTechStack(data: ReadmeData["techStack"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### Tech Stack" : `## ${e(preset, "tech")}Tech Stack`;
    if (data.items.length === 0) return heading;
    const lines: string[] = [heading, ""];
    if (preset === "minimal") {
        data.items.forEach((item) => { lines.push(`- **${item.name}** — ${item.description}`); });
    } else {
        lines.push("| Technology | Description |");
        lines.push("| --- | --- |");
        data.items.forEach((item) => { lines.push(`| **${item.name}** | ${item.description} |`); });
    }
    return lines.join("\n");
}

function generateEnvVariables(data: ReadmeData["envVariables"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### Environment Variables" : `## ${e(preset, "env")}Environment Variables`;
    if (data.variables.length === 0) return heading;
    const lines: string[] = [heading, ""];
    lines.push("| Variable | Description | Required | Default |");
    lines.push("| --- | --- | --- | --- |");
    data.variables.forEach((v) => {
        lines.push(`| \`${v.name}\` | ${v.description} | ${v.required ? "Yes" : "No"} | ${v.defaultValue || "—"} |`);
    });
    return lines.join("\n");
}

function generateApiReference(data: ReadmeData["apiReference"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### API Reference" : `## ${e(preset, "api")}API Reference`;
    const lines: string[] = [heading];
    if (data.baseUrl) lines.push(`\nBase URL: \`${data.baseUrl}\``);
    if (data.endpoints.length > 0) {
        data.endpoints.forEach((ep) => {
            lines.push(`\n### \`${ep.method} ${ep.path}\``);
            if (ep.description) lines.push(`\n${ep.description}`);
            if (ep.parameters) lines.push(`\n**Parameters:**\n\n${ep.parameters}`);
        });
    }
    return lines.join("\n");
}

function generateContributing(data: ReadmeData["contributing"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### Contributing" : `## ${e(preset, "contrib")}Contributing`;
    const lines: string[] = [heading];
    if (data.guidelines) {
        lines.push(`\n${data.guidelines}`);
    } else {
        lines.push("\nContributions are welcome! Please feel free to submit a Pull Request.");
    }
    if (data.codeOfConduct) {
        lines.push("\nPlease read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.");
    }
    if (preset === "detailed") {
        lines.push("\n### Getting Started\n");
        lines.push("1. Fork the repository");
        lines.push("2. Create your feature branch (`git checkout -b feature/amazing-feature`)");
        lines.push("3. Commit your changes (`git commit -m 'Add amazing feature'`)");
        lines.push("4. Push to the branch (`git push origin feature/amazing-feature`)");
        lines.push("5. Open a Pull Request");
    }
    return lines.join("\n");
}

function generateLicense(data: ReadmeData["license"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### License" : `## ${e(preset, "license")}License`;
    const lines: string[] = [heading];
    const year = data.year || new Date().getFullYear().toString();
    const author = data.author || "Your Name";
    lines.push(`\nThis project is licensed under the ${data.type} License — see the [LICENSE](LICENSE) file for details.`);
    lines.push(`\n© ${year} ${author}`);
    return lines.join("\n");
}

function generateScreenshots(data: ReadmeData["screenshots"], preset: StylePreset): string {
    const heading = preset === "minimal" ? "### Screenshots" : `## ${e(preset, "screenshots")}Screenshots`;
    if (data.items.length === 0) return heading;
    const lines: string[] = [heading, ""];
    data.items.forEach((s) => {
        lines.push(`![${s.alt}](${s.url})`);
        lines.push("");
    });
    return lines.join("\n");
}

function generateCustomBlock(data: ReadmeData["customBlock"]): string {
    const lines: string[] = [];
    if (data.title) lines.push(`## ${data.title}`);
    if (data.content) lines.push(`\n${data.content}`);
    return lines.join("\n");
}

function makeGenerators(preset: StylePreset): Record<SectionId, (data: ReadmeData) => string> {
    return {
        introduction: (d) => generateIntroduction(d.introduction, preset),
        badges: (d) => generateBadges(d.badges),
        installation: (d) => generateInstallation(d.installation, preset),
        usage: (d) => generateUsage(d.usage, preset),
        "tech-stack": (d) => generateTechStack(d.techStack, preset),
        "env-variables": (d) => generateEnvVariables(d.envVariables, preset),
        "api-reference": (d) => generateApiReference(d.apiReference, preset),
        contributing: (d) => generateContributing(d.contributing, preset),
        license: (d) => generateLicense(d.license, preset),
        screenshots: (d) => generateScreenshots(d.screenshots, preset),
        "custom-block": (d) => generateCustomBlock(d.customBlock),
    };
}

export function buildMarkdown(
    sections: SectionConfig[],
    data: ReadmeData,
    preset: StylePreset = "standard"
): string {
    const generators = makeGenerators(preset);
    const separator = preset === "minimal" ? "\n\n" : "\n\n---\n\n";
    return sections
        .filter((s) => s.enabled)
        .map((s) => generators[s.id](data))
        .filter(Boolean)
        .join(separator);
}
