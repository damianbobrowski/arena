import type { CommandName, RibbonTab, SidePanelGroup, Tool } from "./domain.ts";
import type {
  CommandHistoryEntry,
  CommandLineState,
  CursorPosition,
  RibbonState,
  SidePanelState,
} from "./state.ts";

/** Structural match for the ref returned by `useStore()` from `@nanostores/vue`. */
export interface ReadonlyValue<T> {
  readonly value: T;
}

export interface UseApplicationMenu {
  items: readonly Tool[];
  runCommand(name: CommandName): void;
}

export interface UseQuickAccess {
  tools: readonly Tool[];
  runCommand(name: CommandName): void;
}

export interface UseRibbon {
  tabs: readonly RibbonTab[];
  ribbon: ReadonlyValue<RibbonState>;
  /** Backed by a nanostores `computed`. */
  activeTab: ReadonlyValue<RibbonTab>;
  selectTab(id: string): void;
  toggleMinimized(): void;
  runCommand(name: CommandName): void;
}

export interface UseSidePanel {
  groups: readonly SidePanelGroup[];
  sidePanel: ReadonlyValue<SidePanelState>;
  /** Core clamps the width. */
  setWidth(px: number): void;
  toggle(): void;
  runCommand(name: CommandName): void;
}

export interface UseCommandLine {
  history: ReadonlyValue<readonly CommandHistoryEntry[]>;
  input: ReadonlyValue<string>;
  commandLine: ReadonlyValue<CommandLineState>;
  /** Bound to the `setCommandInput` action. */
  setInput(text: string): void;
  /** Bound to the `submitCommandInput` action. */
  submit(): void;
  /** Core clamps the height. */
  setHeight(px: number): void;
}

export interface UseViewportArea {
  setCursorPosition(p: CursorPosition): void;
}

export interface UseStatusBar {
  cursor: ReadonlyValue<CursorPosition>;
}
