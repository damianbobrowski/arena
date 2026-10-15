import { getTestStorage } from "@nanostores/persistent";
import { describe, expect, it } from "vite-plus/test";
import { freshCore } from "./fresh-core.ts";

describe("Ribbon Tab selection", () => {
  it("starts on the Home tab", async () => {
    const core = await freshCore();
    expect(core.$ribbon.get().activeTabId).toBe("home");
    expect(core.$activeRibbonTab.get().title).toBe("Home");
  });

  it("selects another Ribbon Tab by id", async () => {
    const core = await freshCore();
    core.selectRibbonTab("view");
    expect(core.$ribbon.get().activeTabId).toBe("view");
    expect(core.$activeRibbonTab.get().title).toBe("View");
  });

  it("ignores an unknown tab id", async () => {
    const core = await freshCore();
    core.selectRibbonTab("view");
    core.selectRibbonTab("nope");
    expect(core.$ribbon.get().activeTabId).toBe("view");
  });

  it("restores the active tab from an earlier session", async () => {
    const core = await freshCore({ "arena:ribbon": { activeTabId: "view", minimized: true } });
    expect(core.$activeRibbonTab.get().title).toBe("View");
    expect(core.$ribbon.get().minimized).toBe(true);
  });

  it("falls back to the first tab when the stored tab no longer exists", async () => {
    const core = await freshCore({ "arena:ribbon": { activeTabId: "removed", minimized: false } });
    expect(core.$activeRibbonTab.get().title).toBe("Home");
  });
});

describe("Ribbon minimizing", () => {
  it("toggles between minimized and expanded", async () => {
    const core = await freshCore();
    expect(core.$ribbon.get().minimized).toBe(false);
    core.toggleRibbonMinimized();
    expect(core.$ribbon.get().minimized).toBe(true);
    core.toggleRibbonMinimized();
    expect(core.$ribbon.get().minimized).toBe(false);
  });

  it("expands the Ribbon when a Ribbon Tab is selected while minimized", async () => {
    const core = await freshCore();
    core.toggleRibbonMinimized();
    core.selectRibbonTab("view");
    expect(core.$ribbon.get()).toEqual({ activeTabId: "view", minimized: false });
  });
});

describe("Ribbon persistence", () => {
  it("keeps the active tab and minimized state across a reload", async () => {
    const before = await freshCore();
    before.selectRibbonTab("view");
    before.toggleRibbonMinimized();

    const after = await freshCore({ ...getTestStorage() });
    expect(after.$activeRibbonTab.get().title).toBe("View");
    expect(after.$ribbon.get().minimized).toBe(true);
  });
});
