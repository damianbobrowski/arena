/** Persisted. */
export interface RibbonState {
  activeTabId: string;
  minimized: boolean;
}

/** Persisted. */
export interface SidePanelState {
  width: number;
  collapsed: boolean;
}

/** Persisted. */
export interface CommandLineState {
  height: number;
}

/** In memory. */
export interface CommandHistoryEntry {
  kind: "command" | "message" | "error";
  text: string;
}

/** In memory. */
export interface CursorPosition {
  x: number;
  y: number;
}
