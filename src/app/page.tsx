"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
    ),
    title: "Modular Sections",
    description: "Toggle, reorder, and configure sections with drag & drop. Build your README the way you want.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    title: "Live Preview",
    description: "See your README render in real time as you type. Switch between rendered and raw markdown views.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
    ),
    title: "Smart Templates",
    description: "Start from curated templates for SaaS, open source, portfolios, and API services.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
    ),
    title: "One-Click Export",
    description: "Download as README.md, copy to clipboard, or view raw source. Ready for your repo.",
  },
];

const sections = [
  "Introduction",
  "Badges",
  "Installation",
  "Usage",
  "Tech Stack",
  "Environment Variables",
  "API Reference",
  "Contributing",
  "License",
  "Screenshots",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

function FloatingCard({
  children,
  className,
  delay = 0,
  duration = 6,
  x = 0,
  y = 0,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x, y, rotate, scale: 0.8, filter: "blur(4px)" }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [y, y - 15, y + 10, y],
        x: [x, x + 5, x - 5, x],
        rotate: [rotate, rotate + 3, rotate - 2, rotate],
        scale: [0.8, 1, 1, 0.95],
        filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(6px)"],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function FloatingSymbol({
  children,
  className,
  delay = 0,
  duration = 8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.span
      className={`absolute text-foreground/[0.04] font-mono select-none pointer-events-none ${className}`}
      initial={{ opacity: 0, filter: "blur(2px)" }}
      animate={{
        opacity: [0, 0.06, 0.04, 0],
        y: [0, -20, -10, 0],
        filter: ["blur(2px)", "blur(0px)", "blur(0px)", "blur(4px)"],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 h-12 rounded-2xl bg-[rgba(43_33_24/0.7)] backdrop-blur-2xl border border-[rgba(247_243_227/0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(247,243,227,0.04)]">
        <div className="flex items-center gap-2 pl-2 pr-3">
          <span className="text-[13px] font-semibold tracking-tight">Docora</span>
        </div>

        <div className="w-px h-5 bg-[rgba(247_243_227/0.08)]" />

        <div className="flex items-center gap-0.5 px-1">
          <a
            href="#features"
            className="px-3 py-1.5 rounded-lg text-[12px] text-muted-foreground/40 hover:text-foreground/70 hover:bg-[rgba(247_243_227/0.04)] transition-all font-medium"
          >
            Features
          </a>
          <a
            href="/how-it-works"
            className="px-3 py-1.5 rounded-lg text-[12px] text-muted-foreground/40 hover:text-foreground/70 hover:bg-[rgba(247_243_227/0.04)] transition-all font-medium"
          >
            How It Works
          </a>
          <a
            href="https://github.com/ilyklain/docora-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-muted-foreground/40 hover:text-foreground/70 hover:bg-[rgba(247_243_227/0.04)] transition-all font-medium"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            GitHub
          </a>
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

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-14"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(247_243_227/0.02)] blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[rgba(247_243_227/0.015)] blur-[80px]" />

          <motion.div
            className="absolute top-[15%] right-[8%] w-[400px] h-[400px] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(247,243,227,0.03) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(247,243,227,0.025) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <FloatingSymbol className="text-[72px] top-[18%] left-[12%]" delay={0} duration={9}>#</FloatingSymbol>
          <FloatingSymbol className="text-[48px] top-[25%] right-[15%]" delay={1.5} duration={7}>{'```'}</FloatingSymbol>
          <FloatingSymbol className="text-[56px] bottom-[30%] left-[8%]" delay={3} duration={10}>{'>'}</FloatingSymbol>
          <FloatingSymbol className="text-[40px] top-[35%] right-[8%]" delay={2} duration={8}>**</FloatingSymbol>
          <FloatingSymbol className="text-[64px] bottom-[25%] right-[12%]" delay={4} duration={9}>##</FloatingSymbol>
          <FloatingSymbol className="text-[36px] top-[50%] left-[15%]" delay={1} duration={11}>{'- [ ]'}</FloatingSymbol>
          <FloatingSymbol className="text-[44px] bottom-[35%] left-[20%]" delay={5} duration={8}>{'|'}</FloatingSymbol>
          <FloatingSymbol className="text-[52px] top-[15%] left-[35%]" delay={3.5} duration={10}>{'---'}</FloatingSymbol>

          <FloatingCard
            className="top-[22%] left-[5%] hidden lg:block"
            delay={0.5}
            duration={7}
            rotate={-12}
          >
            <div
              className="w-36 h-44 rounded-xl border border-[rgba(247_243_227/0.06)] bg-[rgba(43_33_24/0.5)] backdrop-blur-sm p-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ transform: "perspective(600px) rotateY(8deg) rotateX(-4deg)" }}
            >
              <div className="w-16 h-2 rounded bg-[rgba(247_243_227/0.08)] mb-2" />
              <div className="w-full h-1 rounded bg-[rgba(247_243_227/0.03)] mb-1" />
              <div className="w-4/5 h-1 rounded bg-[rgba(247_243_227/0.03)] mb-1" />
              <div className="w-3/5 h-1 rounded bg-[rgba(247_243_227/0.03)] mb-3" />
              <div className="w-12 h-1.5 rounded bg-[rgba(247_243_227/0.06)] mb-1.5" />
              <div className="w-full h-1 rounded bg-[rgba(247_243_227/0.02)] mb-1" />
              <div className="w-5/6 h-1 rounded bg-[rgba(247_243_227/0.02)] mb-1" />
              <div className="w-2/3 h-1 rounded bg-[rgba(247_243_227/0.02)] mb-3" />
              <div className="flex gap-1">
                <div className="w-10 h-3 rounded bg-[rgba(247_243_227/0.04)]" />
                <div className="w-8 h-3 rounded bg-[rgba(247_243_227/0.04)]" />
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="top-[15%] right-[6%] hidden lg:block"
            delay={1.2}
            duration={8}
            rotate={10}
          >
            <div
              className="w-32 h-40 rounded-xl border border-[rgba(247_243_227/0.05)] bg-[rgba(43_33_24/0.4)] backdrop-blur-sm p-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              style={{ transform: "perspective(600px) rotateY(-10deg) rotateX(5deg)" }}
            >
              <div className="flex gap-1 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(247_243_227/0.1)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(247_243_227/0.1)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(247_243_227/0.1)]" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500/30" />
                  <div className="w-16 h-1 rounded bg-[rgba(247_243_227/0.04)]" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500/30" />
                  <div className="w-12 h-1 rounded bg-[rgba(247_243_227/0.04)]" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-yellow-500/30" />
                  <div className="w-20 h-1 rounded bg-[rgba(247_243_227/0.04)]" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500/30" />
                  <div className="w-14 h-1 rounded bg-[rgba(247_243_227/0.04)]" />
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[rgba(247_243_227/0.04)]">
                <div className="w-10 h-1 rounded bg-[rgba(247_243_227/0.06)] mb-1" />
                <div className="text-[6px] text-foreground/[0.07] font-mono">README.md</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-[22%] left-[3%] hidden lg:block"
            delay={2}
            duration={9}
            rotate={-6}
          >
            <div
              className="w-28 h-20 rounded-lg border border-[rgba(247_243_227/0.05)] bg-[rgba(43_33_24/0.4)] backdrop-blur-sm p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              style={{ transform: "perspective(500px) rotateY(12deg) rotateX(6deg)" }}
            >
              <div className="text-[7px] text-foreground/[0.08] font-mono mb-1.5">package.json</div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-0.5">
                  <span className="text-[5px] text-purple-400/20 font-mono">{'"name"'}</span>
                  <span className="text-[5px] text-foreground/[0.06] font-mono">:</span>
                  <span className="text-[5px] text-green-400/20 font-mono">{'"my-app"'}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-[5px] text-purple-400/20 font-mono">{'"version"'}</span>
                  <span className="text-[5px] text-foreground/[0.06] font-mono">:</span>
                  <span className="text-[5px] text-green-400/20 font-mono">{'"1.0.0"'}</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-[18%] right-[5%] hidden lg:block"
            delay={3}
            duration={7.5}
            rotate={8}
          >
            <div
              className="w-40 h-24 rounded-lg border border-[rgba(247_243_227/0.05)] bg-[rgba(43_33_24/0.4)] backdrop-blur-sm p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              style={{ transform: "perspective(500px) rotateY(-8deg) rotateX(-3deg)" }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-3 h-3 rounded bg-[rgba(247_243_227/0.06)] flex items-center justify-center">
                  <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/10"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /></svg>
                </div>
                <span className="text-[6px] text-foreground/[0.08] font-mono">README.md — Preview</span>
              </div>
              <div className="space-y-1">
                <div className="w-24 h-1.5 rounded bg-[rgba(247_243_227/0.05)]" />
                <div className="w-full h-0.5 rounded bg-[rgba(247_243_227/0.025)]" />
                <div className="w-5/6 h-0.5 rounded bg-[rgba(247_243_227/0.025)]" />
                <div className="w-2/3 h-0.5 rounded bg-[rgba(247_243_227/0.025)]" />
                <div className="flex gap-0.5 mt-1">
                  <div className="w-6 h-2 rounded bg-[rgba(247_243_227/0.03)]" />
                  <div className="w-8 h-2 rounded bg-[rgba(247_243_227/0.03)]" />
                  <div className="w-5 h-2 rounded bg-[rgba(247_243_227/0.03)]" />
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="top-[45%] left-[6%] hidden xl:block"
            delay={1.8}
            duration={8}
            rotate={-3}
          >
            <div
              className="flex gap-1.5 p-2 rounded-lg border border-[rgba(247_243_227/0.05)] bg-[rgba(43_33_24/0.4)] backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              style={{ transform: "perspective(400px) rotateY(6deg)" }}
            >
              <div className="px-1.5 py-0.5 rounded bg-[rgba(247_243_227/0.06)]">
                <span className="text-[6px] text-foreground/10 font-mono">build: passing</span>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-[rgba(247_243_227/0.04)]">
                <span className="text-[6px] text-foreground/10 font-mono">MIT</span>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-[rgba(247_243_227/0.04)]">
                <span className="text-[6px] text-foreground/10 font-mono">v2.1.0</span>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="top-[40%] right-[4%] hidden xl:block"
            delay={4}
            duration={9}
            rotate={5}
          >
            <div
              className="w-24 h-28 rounded-lg border border-[rgba(247_243_227/0.04)] bg-[rgba(43_33_24/0.35)] backdrop-blur-sm p-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              style={{ transform: "perspective(500px) rotateY(-12deg) rotateX(3deg)" }}
            >
              <div className="text-[6px] text-foreground/[0.07] font-mono mb-1.5 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-sm bg-[rgba(247_243_227/0.08)]" />
                Sections
              </div>
              <div className="space-y-0.5">
                {["Intro", "Install", "Usage", "Stack", "License"].map((s, i) => (
                  <div key={s} className="flex items-center gap-1 px-1 py-0.5 rounded">
                    <div className={`w-1 h-1 rounded-full ${i < 3 ? "bg-green-500/20" : "bg-[rgba(247_243_227/0.06)]"}`} />
                    <span className="text-[5px] text-foreground/[0.06] font-mono">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>

          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-foreground/[0.06]"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 0.08, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
                filter: ["blur(2px)", "blur(0px)", "blur(3px)"],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                delay: i * 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        >

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="block">Beautiful READMEs,</span>
            <span className="block text-foreground/40">without the hassle.</span>
          </h1>

          <p className="text-[15px] sm:text-base text-muted-foreground/50 max-w-md leading-relaxed mb-10">
            A visual editor for crafting professional README files. Modular sections, live preview, and one-click export.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="h-11 px-6 rounded-xl bg-foreground text-background text-[13px] font-semibold flex items-center gap-2 hover:opacity-90 transition-all hover:shadow-[0_0_30px_rgba(247,243,227,0.08)]"
            >
              Start Building
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-xl border border-border/50 text-foreground/50 text-[13px] font-medium flex items-center gap-2 hover:text-foreground/80 hover:border-border/80 transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 mt-16 w-full max-w-4xl"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-[rgba(247_243_227/0.02)] to-transparent blur-xl pointer-events-none" />

          <div className="relative rounded-xl border border-border/40 bg-[rgba(247_243_227/0.015)] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-border/30 bg-[rgba(247_243_227/0.02)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(247_243_227/0.08)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(247_243_227/0.08)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(247_243_227/0.08)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-3 py-0.5 rounded-md bg-[rgba(247_243_227/0.04)] text-[10px] text-muted-foreground/30 font-mono">
                  docora.co/editor
                </div>
              </div>
            </div>
            <div className="flex h-[340px]">
              <div className="w-48 border-r border-border/20 p-3 space-y-1">
                {sections.map((s, i) => (
                  <div
                    key={s}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] ${i === 0 ? "bg-[rgba(247_243_227/0.06)] text-foreground/70 font-medium" : "text-muted-foreground/25"}`}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-6 space-y-4">
                <div className="space-y-2.5">
                  <div className="text-[10px] text-muted-foreground/25 uppercase tracking-wider font-medium">Project Name</div>
                  <div className="h-8 rounded-md border border-border/20 bg-[rgba(247_243_227/0.02)] flex items-center px-3">
                    <span className="text-[12px] text-foreground/40">My Awesome Project</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="text-[10px] text-muted-foreground/25 uppercase tracking-wider font-medium">Tagline</div>
                  <div className="h-8 rounded-md border border-border/20 bg-[rgba(247_243_227/0.02)] flex items-center px-3">
                    <span className="text-[12px] text-foreground/30">A short description of your project</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="text-[10px] text-muted-foreground/25 uppercase tracking-wider font-medium">Description</div>
                  <div className="h-20 rounded-md border border-border/20 bg-[rgba(247_243_227/0.02)] p-3">
                    <span className="text-[12px] text-foreground/20 leading-relaxed">Tell the world about your project...</span>
                  </div>
                </div>
              </div>
              <div className="w-64 border-l border-border/20 p-5">
                <div className="rounded-lg border border-border/15 bg-[rgba(247_243_227/0.01)] overflow-hidden">
                  <div className="px-3 py-2 border-b border-border/15 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /></svg>
                    <span className="text-[9px] text-muted-foreground/20 font-medium">README.md</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="w-3/4 h-3 rounded bg-[rgba(247_243_227/0.06)]" />
                    <div className="w-full h-1.5 rounded bg-[rgba(247_243_227/0.025)]" />
                    <div className="w-5/6 h-1.5 rounded bg-[rgba(247_243_227/0.025)]" />
                    <div className="w-2/3 h-1.5 rounded bg-[rgba(247_243_227/0.025)]" />
                    <div className="mt-3 w-1/2 h-2.5 rounded bg-[rgba(247_243_227/0.04)]" />
                    <div className="w-full h-1.5 rounded bg-[rgba(247_243_227/0.02)]" />
                    <div className="w-4/5 h-1.5 rounded bg-[rgba(247_243_227/0.02)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <section id="features" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.p variants={fadeUp} custom={0} className="text-[11px] text-muted-foreground/30 uppercase tracking-[0.15em] font-semibold mb-4">
              Features
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Everything you need,<br />
              <span className="text-foreground/35">nothing you don&apos;t.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group p-6 rounded-xl border border-border/30 bg-[rgba(247_243_227/0.015)] hover:bg-[rgba(247_243_227/0.03)] hover:border-border/50 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-[rgba(247_243_227/0.06)] flex items-center justify-center mb-4 text-foreground/50 group-hover:text-foreground/70 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-[14px] font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-[13px] text-muted-foreground/40 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-[11px] text-muted-foreground/30 uppercase tracking-[0.15em] font-semibold mb-4">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-2xl sm:text-3xl font-bold tracking-tight">
              Three steps to a<br />
              <span className="text-foreground/35">perfect README.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              { step: "01", title: "Pick a Template", desc: "Choose from SaaS, open source, portfolio, or API service presets." },
              { step: "02", title: "Fill in Details", desc: "Use structured forms to add your project info. No markdown syntax needed." },
              { step: "03", title: "Export", desc: "Download your README.md, copy to clipboard, or view the raw source." },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i} className="relative">
                <span className="text-5xl font-black text-[rgba(247_243_227/0.04)] leading-none block mb-4">{item.step}</span>
                <h3 className="text-[14px] font-semibold mb-2 tracking-tight">{item.title}</h3>
                <p className="text-[13px] text-muted-foreground/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Ready to build?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-[14px] text-muted-foreground/40 mb-8 leading-relaxed">
              No account needed. Start building your README right now, for free.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:opacity-90 transition-all hover:shadow-[0_0_40px_rgba(247,243,227,0.1)]"
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
