import { defineConfig } from "vite-plus";

const componentsBoundary =
  "Dumb components take props and emit events (ADR-0001); only Regions bind state.";

export default defineConfig({
  fmt: { ignorePatterns: ["**/dist/**"] },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ["**/dist/**"],
    overrides: [
      {
        files: ["apps/arena/src/components/**"],
        rules: {
          "no-restricted-imports": [
            "error",
            {
              paths: [
                {
                  name: "@arena/core",
                  allowTypeImports: true,
                  message: `${componentsBoundary} Use \`import type\` for props.`,
                },
              ],
              patterns: [
                { group: ["@nanostores/*"], message: componentsBoundary },
                { group: ["**/composables", "**/composables/**"], message: componentsBoundary },
              ],
            },
          ],
        },
      },
    ],
  },
  run: {
    cache: true,
  },
});
