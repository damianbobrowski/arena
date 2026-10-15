import { describe, expect, it } from "vite-plus/test";
import { freshCore } from "./fresh-core.ts";

describe("seed Region contents", async () => {
  const core = await freshCore();
  const allTools = [
    ...core.applicationMenuItems,
    ...core.quickAccessTools,
    ...core.ribbonTabs.flatMap((tab) => tab.panels.flatMap((panel) => panel.tools)),
    ...core.sidePanelGroups.flatMap((group) => group.tools),
  ];

  it("every Tool runs a registered Command", () => {
    for (const tool of allTools) {
      core.runCommand("CLEAR");
      core.runCommand(tool.command);
      expect(
        core.$commandHistory.get().filter((e) => e.kind === "error"),
        tool.id,
      ).toEqual([]);
    }
  });

  it("every Tool icon is a complete Lucide UnoCSS class", () => {
    for (const tool of allTools) expect(tool.icon, tool.id).toMatch(/^i-lucide-[a-z0-9-]+$/);
  });

  it("lays out the Application Menu, Quick Access Toolbar, Ribbon and Side Panel", () => {
    expect(core.applicationMenuItems.map((t) => t.label)).toEqual(["New", "Open", "Save", "Close"]);
    expect(core.quickAccessTools.map((t) => t.label)).toEqual([
      "New",
      "Open",
      "Save",
      "Undo",
      "Redo",
    ]);
    expect(core.ribbonTabs.map((t) => t.title)).toEqual(["Home", "View"]);
    for (const tab of core.ribbonTabs) {
      expect(tab.panels).toHaveLength(2);
      for (const panel of tab.panels) expect(panel.tools.length).toBeGreaterThanOrEqual(3);
      for (const panel of tab.panels) expect(panel.tools.length).toBeLessThanOrEqual(4);
    }
    expect(core.sidePanelGroups).toHaveLength(2);
  });
});

describe("cursor position", () => {
  it("records the latest cursor position over the Viewport", async () => {
    const core = await freshCore();
    expect(core.$cursorPosition.get()).toEqual({ x: 0, y: 0 });
    core.setCursorPosition({ x: 12.5, y: -3 });
    expect(core.$cursorPosition.get()).toEqual({ x: 12.5, y: -3 });
  });
});
