// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import { LikeC4VitePlugin } from "likec4/vite-plugin";
import { fileURLToPath } from "url";
import remarkFilterConditional from "./src/plugins/remark-filter-conditional.mjs";

// https://astro.build/config
export default defineConfig({
  // Markdown processing - filter conditional content blocks
  markdown: {
    remarkPlugins: [remarkFilterConditional],
  },

  // Deployment URL configuration
  site:
    process.env.PAGES_SITE_URL ||
    `https://defra.github.io${process.env.BASE_PATH || "/delivery-information-architecture"}`,

  // Base path configuration
  base: process.env.PAGES_SITE_URL || !process.env.CI
    ? "/"
    : process.env.BASE_PATH || "/delivery-information-architecture/",

  // Add vite configuration for LikeC4
  vite: {
    plugins: [
      LikeC4VitePlugin({
        workspace: "../architecture",
      }),
    ],
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
  },

  integrations: [
    react({
      include: ["**/react/*", "**/components/**"],
      experimentalReactChildren: true,
    }),
    starlight({
      title: "Defra Architecture",
      components: {
        // Override the MarkdownContent component to use our custom image component
        MarkdownContent: './src/components/MarkdownContentOverride.astro',
      },
      customCss: [
        // Custom styles for clickable diagrams
        './src/styles/custom.css',
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/DEFRA/delivery-information-architecture",
        },
      ],
      sidebar: [
        {
          label: "Overview",
          items: [
            { label: "Introduction", link: "/" },
          ],
        },
        {
          label: "Guidelines",
          items: [
            { label: "Documentation as Code", link: "/guidelines/documentation-as-code" },
            { label: "Documentation Structure", link: "/guidelines/documentation-structure" },
            { label: "PowerPoint Generation", link: "/guidelines/ppt-generation" },
            { label: "Conditional Content", link: "/guidelines/conditional-content" },
            { label: "AI-Assisted Documentation", link: "/guidelines/ai-guidelines" },
          ],
        },
        {
          label: "Defra Landscape",
          autogenerate: { directory: "defra-landscape" },
        },
        {
          label: "Verticals",
          items: [
            { label: "Trade", link: "/verticals/trade" },
            { label: "Farming", link: "/verticals/farming" },
            { label: "Marine (MMO)", link: "/verticals/marine" },
            { label: "EPR", link: "/verticals/epr" },
            { label: "Environment", link: "/verticals/environment" },
          ],
        },
      ],
    }),
  ],
});

