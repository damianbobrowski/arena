import { atom, type WritableAtom } from "nanostores";
import type { CommandLineState, CursorPosition, SidePanelState } from "./model/index.ts";
import { clampPx, persistedObject, type PxRange, toggleField } from "./persisted.ts";

const SIDE_PANEL_WIDTH: PxRange = [200, 600];
const COMMAND_LINE_HEIGHT: PxRange = [80, 480];

type NumberKey<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

/** Sets one pixel field of an object store, clamped into `range`; ignores non-finite input. */
function setClampedPx<T extends object>(
  store: WritableAtom<T>,
  key: NumberKey<T>,
  px: number,
  range: PxRange,
): void {
  if (!Number.isFinite(px)) return;
  store.set({ ...store.get(), [key]: clampPx(px, range) });
}

/** Persisted. */
export const $sidePanel = persistedObject<SidePanelState>(
  "sidePanel",
  { width: 280, collapsed: false },
  (state) => ({ ...state, width: clampPx(state.width, SIDE_PANEL_WIDTH) }),
);

/** Clamps to 200–600px; ignores non-finite input. */
export function setSidePanelWidth(px: number): void {
  setClampedPx($sidePanel, "width", px, SIDE_PANEL_WIDTH);
}

export function toggleSidePanel(): void {
  toggleField($sidePanel, "collapsed");
}

/** Persisted. */
export const $commandLine = persistedObject<CommandLineState>(
  "commandLine",
  { height: 160 },
  (state) => ({ ...state, height: clampPx(state.height, COMMAND_LINE_HEIGHT) }),
);

/** Clamps to 80–480px; ignores non-finite input. */
export function setCommandLineHeight(px: number): void {
  setClampedPx($commandLine, "height", px, COMMAND_LINE_HEIGHT);
}

/** In memory: the cursor position over the Viewport. */
export const $cursorPosition = atom<CursorPosition>({ x: 0, y: 0 });

export function setCursorPosition(position: CursorPosition): void {
  $cursorPosition.set({ x: position.x, y: position.y });
}
