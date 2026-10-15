import { getTestStorage } from "@nanostores/persistent";
import { describe, expect, it } from "vite-plus/test";
import { freshCore } from "./fresh-core.ts";

describe("Side Panel width", () => {
  it("starts at 280px, expanded", async () => {
    const core = await freshCore();
    expect(core.$sidePanel.get()).toEqual({ width: 280, collapsed: false });
  });

  it("accepts a width within 200–600px, rounded to whole pixels", async () => {
    const core = await freshCore();
    core.setSidePanelWidth(350.6);
    expect(core.$sidePanel.get().width).toBe(351);
  });

  it("clamps the width to 200–600px", async () => {
    const core = await freshCore();
    core.setSidePanelWidth(50);
    expect(core.$sidePanel.get().width).toBe(200);
    core.setSidePanelWidth(5000);
    expect(core.$sidePanel.get().width).toBe(600);
  });

  it("ignores a width that is not a finite number", async () => {
    const core = await freshCore();
    core.setSidePanelWidth(Number.NaN);
    expect(core.$sidePanel.get().width).toBe(280);
  });

  it("clamps a stored width from an earlier session", async () => {
    const core = await freshCore({ "arena:sidePanel": { width: 9999, collapsed: true } });
    expect(core.$sidePanel.get()).toEqual({ width: 600, collapsed: true });
  });

  it("toggles collapsed without losing the width", async () => {
    const core = await freshCore();
    core.setSidePanelWidth(400);
    core.toggleSidePanel();
    expect(core.$sidePanel.get()).toEqual({ width: 400, collapsed: true });
    core.toggleSidePanel();
    expect(core.$sidePanel.get()).toEqual({ width: 400, collapsed: false });
  });
});

describe("Command Line height", () => {
  it("starts at 160px", async () => {
    const core = await freshCore();
    expect(core.$commandLine.get()).toEqual({ height: 160 });
  });

  it("clamps the height to 80–480px", async () => {
    const core = await freshCore();
    core.setCommandLineHeight(10);
    expect(core.$commandLine.get().height).toBe(80);
    core.setCommandLineHeight(2000);
    expect(core.$commandLine.get().height).toBe(480);
    core.setCommandLineHeight(240);
    expect(core.$commandLine.get().height).toBe(240);
  });

  it("clamps a stored height from an earlier session", async () => {
    const core = await freshCore({ "arena:commandLine": { height: -5 } });
    expect(core.$commandLine.get().height).toBe(80);
  });
});

describe("reloading the Shell", () => {
  it("keeps the Side Panel width and collapsed state", async () => {
    const before = await freshCore();
    before.setSidePanelWidth(420);
    before.toggleSidePanel();

    const after = await freshCore({ ...getTestStorage() });

    expect(after.$sidePanel.get()).toEqual({ width: 420, collapsed: true });
  });

  it("keeps the Command Line height but not the Command History or input", async () => {
    const before = await freshCore();
    before.setCommandLineHeight(300);
    before.runCommand("LINE");
    before.setCommandInput("circ");

    const after = await freshCore({ ...getTestStorage() });

    expect(after.$commandLine.get()).toEqual({ height: 300 });
    expect(after.$commandHistory.get()).toEqual([]);
    expect(after.$commandInput.get()).toBe("");
  });
});
