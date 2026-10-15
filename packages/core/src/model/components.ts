/**
 * Props and emits of the dumb components in `apps/arena/src/components/`.
 * Emits use the labeled-tuple form accepted by Vue's `defineEmits<T>()`.
 */
import type { CommandName, RibbonPanel, RibbonTab, SidePanelGroup, Tool } from "./domain.ts";
import type { CommandHistoryEntry, CursorPosition } from "./state.ts";

interface RunEmits {
  run: [command: CommandName];
}

export interface ToolButtonProps {
  tool: Tool;
  size: "large" | "small";
}
export type ToolButtonEmits = RunEmits;

export interface QuickAccessToolbarProps {
  tools: readonly Tool[];
}
export type QuickAccessToolbarEmits = RunEmits;

/** Opened with a native popover; no open-state. */
export interface ApplicationMenuProps {
  items: readonly Tool[];
}
export type ApplicationMenuEmits = RunEmits;

export interface RibbonTabBarProps {
  tabs: readonly RibbonTab[];
  activeTabId: string;
  minimized: boolean;
}
export interface RibbonTabBarEmits {
  select: [id: string];
  toggleMinimized: [];
}

export interface RibbonPanelViewProps {
  panel: RibbonPanel;
}
export type RibbonPanelViewEmits = RunEmits;

export interface SidePanelGroupViewProps {
  group: SidePanelGroup;
}
export type SidePanelGroupViewEmits = RunEmits;

export interface IconButtonProps {
  icon: string;
  label: string;
}
export interface IconButtonEmits {
  click: [];
}

export interface SplitterProps {
  orientation: "horizontal" | "vertical";
  size: number;
  reverse?: boolean;
}
export interface SplitterEmits {
  resize: [size: number];
}

export interface CommandHistoryListProps {
  entries: readonly CommandHistoryEntry[];
}

export interface CommandInputProps {
  value: string;
}
export interface CommandInputEmits {
  input: [text: string];
  submit: [];
}

/** Viewport takes no props. */
export interface ViewportEmits {
  pointerMove: [position: CursorPosition];
}

export interface StatusBarProps {
  cursor: CursorPosition;
}
