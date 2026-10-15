import { describe, expectTypeOf, it } from "vite-plus/test";
import type {
  CommandHistoryEntry,
  ReadonlyValue,
  RibbonState,
  RibbonTab,
  Tool,
  UseRibbon,
} from "../src/index.ts";

describe("@arena/core model", () => {
  it("describes a Ribbon Tab made of Ribbon Panels of Tools", () => {
    const tool: Tool = { id: "line", command: "LINE", label: "Line", icon: "i-lucide-slash" };
    const tab: RibbonTab = {
      id: "home",
      title: "Home",
      panels: [{ id: "draw", title: "Draw", tools: [tool] }],
    };
    expectTypeOf(tab.panels[0]!.tools[0]!).toEqualTypeOf<Tool>();
  });

  it("exposes Ribbon state to Regions as read-only values", () => {
    expectTypeOf<UseRibbon["ribbon"]>().toEqualTypeOf<ReadonlyValue<RibbonState>>();
    expectTypeOf<CommandHistoryEntry["kind"]>().toEqualTypeOf<"command" | "message" | "error">();
  });
});
