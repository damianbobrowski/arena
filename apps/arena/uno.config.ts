import { resolve } from "node:path";
import { defineConfig, presetIcons, presetWind4 } from "unocss";

const coreSources = resolve(import.meta.dirname, "../../packages/core/src");

/**
 * Dark-only theme. Regions and components use these tokens
 * (`bg-surface`, `text-muted`, `border-line`, ...) instead of raw palette colors.
 */
export default defineConfig({
  presets: [presetWind4(), presetIcons({ scale: 1.1 })],
  content: {
    // Icon classes live in @arena/core seed data (Tool.icon), not in templates,
    // so core sources are both globbed and let through the pipeline filter
    // (the filesystem glob is dropped for files the filter rejects).
    pipeline: {
      include: [/\.(vue|[jt]sx|html)($|\?)/, `${coreSources}/**/*.ts`],
    },
    filesystem: [`${coreSources}/**/*.ts`],
  },
  theme: {
    colors: {
      base: "#1e1f22", // app and Viewport background
      surface: "#2b2d30", // Region background
      raised: "#3c3f41", // hovered / active controls
      line: "#43454a", // borders and Splitters
      text: "#dfe1e5",
      muted: "#9da0a8",
      accent: "#3574f0",
      danger: "#f75464", // error entries in the Command History
    },
    font: {
      sans: "Inter, system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
  },
  preflights: [
    {
      getCSS: () => ":root { color-scheme: dark; }",
    },
  ],
});
