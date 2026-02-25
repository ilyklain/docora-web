<div align="center">

# Docora

**Beautiful READMEs, without the hassle.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-f012be?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, visual editor for crafting professional `README.md` files. Build, customize, and configure your repositories directly from your browser with a seamless, modular experience.

[**Open Editor**](#) • [**How It Works**](#)

</div>

---

## Features

- **Modular Sections:** Toggle, reorder, and configure sections with drag and drop mechanics. Build your documentation the way you want.
- **Live Preview:** View your markdown render in real-time alongside a synchronized raw code view.
- **Smart Templates:** Instantly start from curated presets covering SaaS, Open Source Libraries, Portfolios, and API Services.
- **Style Presets:** Transform the entire visual flow of your output with a single click (Standard, Minimal, Detailed, Emoji, or Corporate).
- **Integrated Badge Builder:** Browse or visually search for Shields.io badges across categories including coverage, build status, technologies, and licenses.
- **GitHub Auto-Import:** Instantly populate your documentation by fetching repository data (descriptions, languages, topics, stars) directly from the GitHub API.
- **Shareable Links:** Generate and share URLs that preserve your entire temporary editor state via base64 encoding.

---

## Quick Start

Ensure you have Node.js 18 or later installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/docora-web.git
   cd docora-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the Application:**
   Navigate to `http://localhost:3000` to view the landing page, or proceed directly to `/editor` to begin building.

---

## Technology Stack

Docora is built using modern web development standards to ensure a fast, robust, and accessible user experience:

- **Framework:** [Next.js (App Router)](https://nextjs.org/) with React 18
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Drag & Drop:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **UI Components:** Built utilizing Radix UI primitives and custom elements.
- **Markdown Processing:** `react-markdown`, `remark-gfm`, and `rehype-raw`

---

## Contributing

Contributions are essential to making the open-source community a place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. Built by Gustavo J.
