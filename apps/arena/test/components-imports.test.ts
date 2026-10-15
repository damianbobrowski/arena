/**
 * The components/ boundary from ADR-0001: dumb components take props and emit
 * events, so they may only `import type` from @arena/core. Each case writes a
 * probe component into src/components/, lints it with the workspace config and
 * removes it again.
 */
import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vite-plus/test";

const appRoot = resolve(import.meta.dirname, "..");
const workspaceRoot = resolve(appRoot, "../..");
const componentsDir = join(appRoot, "src/components");

let probe: string | undefined;

afterEach(() => {
  if (probe) rmSync(probe, { force: true });
  probe = undefined;
});

function lintComponent(script: string): { ok: boolean; output: string } {
  probe = join(componentsDir, `LintProbe${process.pid}.vue`);
  writeFileSync(
    probe,
    `<script setup lang="ts">\n${script}\n</script>\n\n<template><div /></template>\n`,
  );
  const result = spawnSync("vp", ["lint", relative(workspaceRoot, probe)], {
    cwd: workspaceRoot,
    encoding: "utf8",
  });
  return { ok: result.status === 0, output: `${result.stdout}${result.stderr}` };
}

describe("components/ import boundary", () => {
  it("allows type imports from @arena/core", () => {
    const result = lintComponent(
      `import type { ToolButtonProps } from "@arena/core";\ndefineProps<ToolButtonProps>();`,
    );
    expect(result.output).not.toContain("no-restricted-imports");
    expect(result.ok).toBe(true);
  });

  it.each([
    ["@arena/core", `import { runCommand } from "@arena/core";\nrunCommand("LINE");`],
    ["@nanostores/*", `import { useStore } from "@nanostores/vue";\nuseStore;`],
    ["composables", `import { useRibbon } from "../composables/useRibbon.ts";\nuseRibbon;`],
  ])("rejects a value import of %s", (_, script) => {
    const result = lintComponent(script);
    expect(result.output).toContain("no-restricted-imports");
    expect(result.ok).toBe(false);
  });
});
