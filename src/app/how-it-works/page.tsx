"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Choose a Template",
        description:
            "Start with a pre-built template designed for your type of project. Pick from SaaS applications, open source libraries, personal portfolios, or API documentation — each one comes with the right sections pre-configured and ready to customize.",
        visual: (
            <div className="grid grid-cols-2 gap-2.5">
                {[
                    { label: "SaaS Project", icon: "◆" },
                    { label: "Open Source", icon: "◇" },
                    { label: "Portfolio", icon: "○" },
                    { label: "API Docs", icon: "□" },
                ].map((t) => (
                    <div
                        key={t.label}
                        className="px-4 py-3.5 rounded-lg border border-[rgba(247,243,227,0.06)] bg-[rgba(247,243,227,0.02)] hover:bg-[rgba(247,243,227,0.04)] transition-colors cursor-default"
                    >
                        <span className="text-[18px] block mb-2 text-foreground/20">{t.icon}</span>
                        <span className="text-[12px] font-medium text-foreground/60">{t.label}</span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        number: "02",
        title: "Fill in Your Details",
        description:
            "Use structured forms to add your project information — no markdown syntax required. Each section has labeled fields: project name, tagline, installation steps, environment variables, API endpoints, and more. Just type and the markdown builds itself.",
        visual: (
            <div className="space-y-3">
                {[
                    { label: "Project Name", value: "My Awesome Project" },
                    { label: "Tagline", value: "A short description" },
                    { label: "Install Command", value: "npm install my-project" },
                ].map((field) => (
                    <div key={field.label} className="space-y-1.5">
                        <div className="text-[10px] text-muted-foreground/30 uppercase tracking-wider font-medium">
                            {field.label}
                        </div>
                        <div className="h-9 rounded-lg border border-[rgba(247,243,227,0.06)] bg-[rgba(247,243,227,0.02)] flex items-center px-3">
                            <span className="text-[12px] text-foreground/35">{field.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        number: "03",
        title: "Toggle & Reorder Sections",
        description:
            "Enable only the sections you need. Drag and drop to reorder them. Every project is different — your README should reflect that. Toggle off what you don't need, and the generated markdown updates instantly.",
        visual: (
            <div className="space-y-1">
                {[
                    { label: "Introduction", on: true },
                    { label: "Installation", on: true },
                    { label: "Usage", on: true },
                    { label: "API Reference", on: false },
                    { label: "Contributing", on: true },
                    { label: "License", on: true },
                ].map((s) => (
                    <div
                        key={s.label}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg ${s.on ? "bg-[rgba(247,243,227,0.03)]" : ""}`}
                    >
                        <span className={`text-[12px] ${s.on ? "text-foreground/60" : "text-muted-foreground/20 line-through"}`}>
                            {s.label}
                        </span>
                        <div className={`w-7 h-4 rounded-full flex items-center px-0.5 transition-colors ${s.on ? "bg-foreground/20 justify-end" : "bg-[rgba(247,243,227,0.06)] justify-start"}`}>
                            <div className={`w-3 h-3 rounded-full ${s.on ? "bg-foreground/60" : "bg-[rgba(247,243,227,0.15)]"}`} />
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        number: "04",
        title: "Preview in Real Time",
        description:
            "Watch your README render live as you type. Switch between a rendered preview that looks exactly like GitHub, and a raw markdown view with line numbers. No more guessing what the output will look like.",
        visual: (
            <div className="rounded-lg border border-[rgba(247,243,227,0.06)] overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[rgba(247,243,227,0.06)] bg-[rgba(247,243,227,0.02)]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/30">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 2v6h6" />
                    </svg>
                    <span className="text-[10px] text-muted-foreground/30 font-medium">README.md</span>
                </div>
                <div className="p-4 space-y-2.5">
                    <div className="w-2/3 h-4 rounded bg-[rgba(247,243,227,0.06)]" />
                    <div className="w-full h-1.5 rounded bg-[rgba(247,243,227,0.025)]" />
                    <div className="w-5/6 h-1.5 rounded bg-[rgba(247,243,227,0.025)]" />
                    <div className="w-3/4 h-1.5 rounded bg-[rgba(247,243,227,0.02)]" />
                    <div className="mt-4 w-2/5 h-3 rounded bg-[rgba(247,243,227,0.04)]" />
                    <div className="w-full h-1.5 rounded bg-[rgba(247,243,227,0.02)]" />
                    <div className="w-4/5 h-1.5 rounded bg-[rgba(247,243,227,0.02)]" />
                    <div className="w-2/3 h-1.5 rounded bg-[rgba(247,243,227,0.015)]" />
                </div>
            </div>
        ),
    },
    {
        number: "05",
        title: "Export & Ship",
        description:
            "When you're happy with the result, export it instantly. Download as a .md file, copy the entire markdown to your clipboard, or view the raw source. Drop it into your repo and you're done.",
        visual: (
            <div className="flex flex-col gap-2">
                {[
                    {
                        label: "Copy to Clipboard",
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        ),
                    },
                    {
                        label: "Download .md",
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        ),
                    },
                    {
                        label: "View Raw Source",
                        icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                        ),
                    },
                ].map((action) => (
                    <div
                        key={action.label}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[rgba(247,243,227,0.06)] bg-[rgba(247,243,227,0.02)] hover:bg-[rgba(247,243,227,0.04)] transition-colors cursor-default"
                    >
                        <div className="text-foreground/30">{action.icon}</div>
                        <span className="text-[12px] font-medium text-foreground/55">{action.label}</span>
                    </div>
                ))}
            </div>
        ),
    },
];

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
};

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 h-12 rounded-2xl bg-[rgba(43_33_24/0.7)] backdrop-blur-2xl border border-[rgba(247_243_227/0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(247,243,227,0.04)]">
                <Link href="/" className="flex items-center gap-2 pl-2 pr-3">
                    <div className="w-6 h-6 rounded-md bg-[rgba(247_243_227/0.08)] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-foreground/80">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-semibold tracking-tight">Docora</span>
                </Link>

                <div className="w-px h-5 bg-[rgba(247_243_227/0.08)]" />

                <div className="flex items-center gap-0.5 px-1">
                    <Link
                        href="/#features"
                        className="px-3 py-1.5 rounded-lg text-[12px] text-muted-foreground/40 hover:text-foreground/70 hover:bg-[rgba(247_243_227/0.04)] transition-all font-medium"
                    >
                        Features
                    </Link>
                    <span className="px-3 py-1.5 rounded-lg text-[12px] text-foreground/70 bg-[rgba(247_243_227/0.05)] font-medium">
                        How It Works
                    </span>
                </div>

                <div className="w-px h-5 bg-[rgba(247_243_227/0.08)]" />

                <Link
                    href="/editor"
                    className="h-8 px-4 ml-1 rounded-xl bg-foreground text-background text-[12px] font-semibold flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(247,243,227,0.12)] transition-all"
                >
                    Open Editor
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
            </nav>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[11px] text-muted-foreground/30 uppercase tracking-[0.15em] font-semibold mb-4"
                    >
                        How It Works
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-3xl sm:text-4xl font-bold tracking-tight mb-5"
                    >
                        From blank page to
                        <br />
                        <span className="text-foreground/35">polished README.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-[14px] text-muted-foreground/40 max-w-md mx-auto leading-relaxed"
                    >
                        Five simple steps. No markdown knowledge needed. Just fill in your project details and export a professional README.
                    </motion.p>
                </div>
            </section>

            <section className="pb-32 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            variants={fadeUp}
                            className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 md:gap-12 items-start p-8 rounded-2xl border border-[rgba(247,243,227,0.05)] bg-[rgba(247,243,227,0.01)] hover:border-[rgba(247,243,227,0.08)] transition-colors duration-300"
                            style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
                        >
                            <div style={{ direction: "ltr" }}>
                                <span className="text-4xl font-black text-[rgba(247,243,227,0.04)] leading-none block mb-3">
                                    {step.number}
                                </span>
                                <h2 className="text-[18px] font-semibold tracking-tight mb-3">
                                    {step.title}
                                </h2>
                                <p className="text-[13px] text-muted-foreground/40 leading-[1.8]">
                                    {step.description}
                                </p>
                            </div>
                            <div style={{ direction: "ltr" }} className="w-full">
                                {step.visual}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section className="py-24 px-6 border-t border-border/10">
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                            Ready to try it?
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-[14px] text-muted-foreground/40 mb-8 leading-relaxed">
                            No sign-up. No paywall. Just open the editor and start building.
                        </motion.p>
                        <motion.div variants={fadeUp}>
                            <Link
                                href="/editor"
                                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:shadow-[0_0_40px_rgba(247,243,227,0.1)] transition-all"
                            >
                                Open the Editor
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <footer className="border-t border-border/20 py-8 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[rgba(247_243_227/0.06)] flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /></svg>
                        </div>
                        <span className="text-[11px] text-muted-foreground/30">Docora — README Generator</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/20 font-mono">Made By Gustavo J.</span>
                </div>
            </footer>
        </div>
    );
}
