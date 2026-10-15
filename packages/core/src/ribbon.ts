import { computed } from "nanostores";
import type { RibbonState, RibbonTab } from "./model/index.ts";
import { persistedObject, toggleField } from "./persisted.ts";
import { ribbonTabs } from "./seed.ts";

const firstTab = ribbonTabs[0]!;

/** Persisted. */
export const $ribbon = persistedObject<RibbonState>("ribbon", {
  activeTabId: firstTab.id,
  minimized: false,
});

/** The active Ribbon Tab; falls back to the first tab if the stored id no longer exists. */
export const $activeRibbonTab = computed(
  $ribbon,
  ({ activeTabId }): RibbonTab => ribbonTabs.find((tab) => tab.id === activeTabId) ?? firstTab,
);

/** Also expands a minimized Ribbon. */
export function selectRibbonTab(id: string): void {
  if (ribbonTabs.some((tab) => tab.id === id)) $ribbon.set({ activeTabId: id, minimized: false });
}

export function toggleRibbonMinimized(): void {
  toggleField($ribbon, "minimized");
}
