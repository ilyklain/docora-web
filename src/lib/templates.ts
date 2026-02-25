import type { Template } from "@/types";

export const templates: Template[] = [
    {
        id: "saas",
        name: "SaaS Project",
        description: "Full-featured SaaS application template",
        sections: [
            { id: "introduction", label: "Introduction", enabled: true },
            { id: "badges", label: "Badges", enabled: true },
            { id: "installation", label: "Installation", enabled: true },
            { id: "usage", label: "Usage", enabled: true },
            { id: "tech-stack", label: "Tech Stack", enabled: true },
            { id: "env-variables", label: "Environment Variables", enabled: true },
            { id: "api-reference", label: "API Reference", enabled: true },
            { id: "contributing", label: "Contributing", enabled: true },
            { id: "license", label: "License", enabled: true },
            { id: "screenshots", label: "Screenshots", enabled: true },
            { id: "custom-block", label: "Custom Block", enabled: false },
        ],
        data: {
            introduction: {
                projectName: "Acme SaaS Platform",
                tagline: "The modern platform for team productivity",
                description:
                    "Acme is a full-stack SaaS platform built for teams who want to ship faster. It includes authentication, billing, team management, and a powerful dashboard out of the box.",
            },
            installation: {
                packageManager: "npm",
                installCommand: "npm install",
                additionalSteps:
                    "1. Clone the repository\n2. Copy `.env.example` to `.env.local`\n3. Run database migrations with `npx prisma migrate dev`\n4. Start the development server",
            },
            usage: {
                quickStart:
                    "After installation, start the development server and navigate to `http://localhost:3000` to access the dashboard.",
                codeExample: "npm run dev",
                codeLanguage: "bash",
            },
            techStack: {
                items: [
                    { name: "Next.js", description: "React framework for production" },
                    { name: "TypeScript", description: "Type-safe JavaScript" },
                    { name: "Prisma", description: "Type-safe database ORM" },
                    { name: "Stripe", description: "Payment processing" },
                    { name: "TailwindCSS", description: "Utility-first CSS framework" },
                ],
            },
            envVariables: {
                variables: [
                    { name: "DATABASE_URL", description: "PostgreSQL connection string", required: true, defaultValue: "" },
                    { name: "NEXTAUTH_SECRET", description: "NextAuth.js secret key", required: true, defaultValue: "" },
                    { name: "STRIPE_SECRET_KEY", description: "Stripe API secret key", required: true, defaultValue: "" },
                    { name: "NEXT_PUBLIC_APP_URL", description: "Public application URL", required: false, defaultValue: "http://localhost:3000" },
                ],
            },
            apiReference: {
                baseUrl: "https://api.acme.com/v1",
                endpoints: [
                    { method: "GET", path: "/users", description: "List all users", parameters: "`page` — Page number (default: 1)\n`limit` — Items per page (default: 20)" },
                    { method: "POST", path: "/users", description: "Create a new user", parameters: "`email` — User email (required)\n`name` — User display name" },
                ],
            },
            contributing: {
                guidelines:
                    "1. Fork the repository\n2. Create a feature branch (`git checkout -b feature/my-feature`)\n3. Commit your changes (`git commit -am 'Add my feature'`)\n4. Push to the branch (`git push origin feature/my-feature`)\n5. Open a Pull Request",
                codeOfConduct: true,
            },
            license: {
                type: "MIT",
                year: new Date().getFullYear().toString(),
                author: "Acme Inc.",
            },
            screenshots: {
                items: [
                    { alt: "Dashboard", url: "https://via.placeholder.com/800x400?text=Dashboard" },
                    { alt: "Analytics", url: "https://via.placeholder.com/800x400?text=Analytics" },
                ],
            },
            badges: {
                items: [
                    { label: "Build Status", url: "https://img.shields.io/badge/build-passing-brightgreen" },
                    { label: "License", url: "https://img.shields.io/badge/license-MIT-blue" },
                    { label: "Version", url: "https://img.shields.io/badge/version-1.0.0-orange" },
                ],
            },
            customBlock: { title: "", content: "" },
        },
    },
    {
        id: "open-source",
        name: "Open Source Library",
        description: "Library or package template for open source projects",
        sections: [
            { id: "introduction", label: "Introduction", enabled: true },
            { id: "badges", label: "Badges", enabled: true },
            { id: "installation", label: "Installation", enabled: true },
            { id: "usage", label: "Usage", enabled: true },
            { id: "tech-stack", label: "Tech Stack", enabled: false },
            { id: "env-variables", label: "Environment Variables", enabled: false },
            { id: "api-reference", label: "API Reference", enabled: true },
            { id: "contributing", label: "Contributing", enabled: true },
            { id: "license", label: "License", enabled: true },
            { id: "screenshots", label: "Screenshots", enabled: false },
            { id: "custom-block", label: "Custom Block", enabled: false },
        ],
        data: {
            introduction: {
                projectName: "superlib",
                tagline: "A lightweight, zero-dependency utility library",
                description:
                    "superlib provides a collection of well-tested utility functions for common JavaScript operations. It supports both ESM and CommonJS, has full TypeScript support, and tree-shakes perfectly.",
            },
            installation: {
                packageManager: "npm",
                installCommand: "npm install superlib",
                additionalSteps: "",
            },
            usage: {
                quickStart: "Import the functions you need directly from the package.",
                codeExample:
                    'import { debounce, throttle, deepClone } from "superlib";\n\nconst debouncedFn = debounce(() => {\n  console.log("Debounced!");\n}, 300);',
                codeLanguage: "typescript",
            },
            techStack: { items: [] },
            envVariables: { variables: [] },
            apiReference: {
                baseUrl: "",
                endpoints: [
                    { method: "GET", path: "debounce(fn, delay)", description: "Creates a debounced version of the provided function.", parameters: "`fn` — Function to debounce\n`delay` — Delay in milliseconds" },
                    { method: "GET", path: "throttle(fn, limit)", description: "Creates a throttled version of the provided function.", parameters: "`fn` — Function to throttle\n`limit` — Time limit in milliseconds" },
                ],
            },
            contributing: {
                guidelines:
                    "1. Fork the repository\n2. Install dependencies with `npm install`\n3. Run tests with `npm test`\n4. Make your changes\n5. Ensure all tests pass\n6. Submit a Pull Request",
                codeOfConduct: true,
            },
            license: {
                type: "MIT",
                year: new Date().getFullYear().toString(),
                author: "Open Source Author",
            },
            screenshots: { items: [] },
            badges: {
                items: [
                    { label: "npm version", url: "https://img.shields.io/npm/v/superlib" },
                    { label: "Bundle Size", url: "https://img.shields.io/bundlephobia/minzip/superlib" },
                    { label: "License", url: "https://img.shields.io/npm/l/superlib" },
                ],
            },
            customBlock: { title: "", content: "" },
        },
    },
    {
        id: "portfolio",
        name: "Personal Portfolio",
        description: "Portfolio or personal project showcase",
        sections: [
            { id: "introduction", label: "Introduction", enabled: true },
            { id: "badges", label: "Badges", enabled: false },
            { id: "installation", label: "Installation", enabled: true },
            { id: "usage", label: "Usage", enabled: true },
            { id: "tech-stack", label: "Tech Stack", enabled: true },
            { id: "env-variables", label: "Environment Variables", enabled: true },
            { id: "api-reference", label: "API Reference", enabled: false },
            { id: "contributing", label: "Contributing", enabled: false },
            { id: "license", label: "License", enabled: true },
            { id: "screenshots", label: "Screenshots", enabled: true },
            { id: "custom-block", label: "Custom Block", enabled: false },
        ],
        data: {
            introduction: {
                projectName: "My Portfolio",
                tagline: "Personal portfolio and project showcase",
                description:
                    "A modern, responsive portfolio website built with Next.js and TailwindCSS. Features project showcases, blog integration, contact form, and dark mode support.",
            },
            installation: {
                packageManager: "npm",
                installCommand: "npm install",
                additionalSteps: "1. Clone the repository\n2. Copy `.env.example` to `.env.local`\n3. Add your content to the `content/` directory",
            },
            usage: {
                quickStart: "Run the development server and customize the content in the `content/` directory.",
                codeExample: "npm run dev",
                codeLanguage: "bash",
            },
            techStack: {
                items: [
                    { name: "Next.js 14", description: "React framework with App Router" },
                    { name: "TailwindCSS", description: "Styling and responsive design" },
                    { name: "Framer Motion", description: "Animations and transitions" },
                    { name: "MDX", description: "Blog content management" },
                ],
            },
            envVariables: {
                variables: [
                    { name: "NEXT_PUBLIC_SITE_URL", description: "Your portfolio URL", required: true, defaultValue: "http://localhost:3000" },
                    { name: "CONTACT_EMAIL", description: "Email for contact form", required: true, defaultValue: "" },
                ],
            },
            apiReference: { baseUrl: "", endpoints: [] },
            contributing: { guidelines: "", codeOfConduct: false },
            license: {
                type: "MIT",
                year: new Date().getFullYear().toString(),
                author: "Your Name",
            },
            screenshots: {
                items: [
                    { alt: "Home Page", url: "https://via.placeholder.com/800x400?text=Portfolio+Home" },
                    { alt: "Projects Page", url: "https://via.placeholder.com/800x400?text=Projects" },
                ],
            },
            badges: { items: [] },
            customBlock: { title: "", content: "" },
        },
    },
    {
        id: "api-service",
        name: "API Service",
        description: "Backend API service or microservice",
        sections: [
            { id: "introduction", label: "Introduction", enabled: true },
            { id: "badges", label: "Badges", enabled: true },
            { id: "installation", label: "Installation", enabled: true },
            { id: "usage", label: "Usage", enabled: true },
            { id: "tech-stack", label: "Tech Stack", enabled: true },
            { id: "env-variables", label: "Environment Variables", enabled: true },
            { id: "api-reference", label: "API Reference", enabled: true },
            { id: "contributing", label: "Contributing", enabled: true },
            { id: "license", label: "License", enabled: true },
            { id: "screenshots", label: "Screenshots", enabled: false },
            { id: "custom-block", label: "Custom Block", enabled: false },
        ],
        data: {
            introduction: {
                projectName: "API Gateway Service",
                tagline: "High-performance REST API gateway",
                description:
                    "A production-ready API gateway service built with Node.js and Express. Features rate limiting, authentication, request validation, logging, and comprehensive error handling.",
            },
            installation: {
                packageManager: "npm",
                installCommand: "npm install",
                additionalSteps:
                    "1. Clone the repository\n2. Copy `.env.example` to `.env`\n3. Start Redis with `docker-compose up -d redis`\n4. Run database migrations\n5. Start the server",
            },
            usage: {
                quickStart: "Start the server and access the API at `http://localhost:8080`.",
                codeExample:
                    'curl -X GET http://localhost:8080/api/v1/health \\\n  -H "Authorization: Bearer YOUR_TOKEN"',
                codeLanguage: "bash",
            },
            techStack: {
                items: [
                    { name: "Node.js", description: "Runtime environment" },
                    { name: "Express", description: "Web framework" },
                    { name: "PostgreSQL", description: "Primary database" },
                    { name: "Redis", description: "Caching and rate limiting" },
                    { name: "Docker", description: "Containerization" },
                ],
            },
            envVariables: {
                variables: [
                    { name: "PORT", description: "Server port", required: false, defaultValue: "8080" },
                    { name: "DATABASE_URL", description: "PostgreSQL connection string", required: true, defaultValue: "" },
                    { name: "REDIS_URL", description: "Redis connection string", required: true, defaultValue: "redis://localhost:6379" },
                    { name: "JWT_SECRET", description: "JWT signing secret", required: true, defaultValue: "" },
                    { name: "RATE_LIMIT_MAX", description: "Max requests per window", required: false, defaultValue: "100" },
                ],
            },
            apiReference: {
                baseUrl: "http://localhost:8080/api/v1",
                endpoints: [
                    { method: "GET", path: "/health", description: "Health check endpoint", parameters: "" },
                    { method: "POST", path: "/auth/login", description: "Authenticate user and receive JWT", parameters: "`email` — User email (required)\n`password` — User password (required)" },
                    { method: "GET", path: "/users", description: "List users with pagination", parameters: "`page` — Page number\n`limit` — Items per page\n`sort` — Sort field" },
                    { method: "POST", path: "/users", description: "Create a new user", parameters: "`email` — User email (required)\n`name` — Display name (required)\n`role` — User role (default: user)" },
                ],
            },
            contributing: {
                guidelines:
                    "1. Fork the repository\n2. Create a feature branch\n3. Write tests for new features\n4. Ensure all tests pass with `npm test`\n5. Submit a Pull Request with a clear description",
                codeOfConduct: true,
            },
            license: {
                type: "Apache-2.0",
                year: new Date().getFullYear().toString(),
                author: "API Service Team",
            },
            screenshots: { items: [] },
            badges: {
                items: [
                    { label: "Build", url: "https://img.shields.io/badge/build-passing-brightgreen" },
                    { label: "Coverage", url: "https://img.shields.io/badge/coverage-95%25-brightgreen" },
                    { label: "License", url: "https://img.shields.io/badge/license-Apache--2.0-blue" },
                ],
            },
            customBlock: { title: "", content: "" },
        },
    },
];
