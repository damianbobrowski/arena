/**
 * Static Region contents. Every Tool's `command` is a registered Command name,
 * and every `icon` is a complete literal UnoCSS class so the icon scanner finds it.
 */
import type { RibbonTab, SidePanelGroup, Tool } from "./model/index.ts";

const tool = {
  new: { id: "new", command: "NEW", label: "New", icon: "i-lucide-file-plus" },
  open: { id: "open", command: "OPEN", label: "Open", icon: "i-lucide-folder-open" },
  save: { id: "save", command: "SAVE", label: "Save", icon: "i-lucide-save" },
  close: { id: "close", command: "CLOSE", label: "Close", icon: "i-lucide-x" },
  undo: { id: "undo", command: "UNDO", label: "Undo", icon: "i-lucide-undo-2" },
  redo: { id: "redo", command: "REDO", label: "Redo", icon: "i-lucide-redo-2" },
  line: { id: "line", command: "LINE", label: "Line", icon: "i-lucide-slash" },
  circle: { id: "circle", command: "CIRCLE", label: "Circle", icon: "i-lucide-circle" },
  rectangle: { id: "rectangle", command: "RECTANGLE", label: "Rectangle", icon: "i-lucide-square" },
  move: { id: "move", command: "MOVE", label: "Move", icon: "i-lucide-move" },
  copy: { id: "copy", command: "COPY", label: "Copy", icon: "i-lucide-copy" },
  erase: { id: "erase", command: "ERASE", label: "Erase", icon: "i-lucide-eraser" },
  pan: { id: "pan", command: "PAN", label: "Pan", icon: "i-lucide-hand" },
  zoom: { id: "zoom", command: "ZOOM", label: "Zoom", icon: "i-lucide-zoom-in" },
  fit: { id: "fit", command: "FIT", label: "Fit", icon: "i-lucide-maximize" },
  grid: { id: "grid", command: "GRID", label: "Grid", icon: "i-lucide-grid-3x3" },
  snap: { id: "snap", command: "SNAP", label: "Snap", icon: "i-lucide-magnet" },
  rulers: { id: "rulers", command: "RULERS", label: "Rulers", icon: "i-lucide-ruler" },
  help: { id: "help", command: "HELP", label: "Help", icon: "i-lucide-circle-question-mark" },
  clear: { id: "clear", command: "CLEAR", label: "Clear History", icon: "i-lucide-trash" },
} satisfies Record<string, Tool>;

export const applicationMenuItems: Tool[] = [tool.new, tool.open, tool.save, tool.close];

export const quickAccessTools: Tool[] = [tool.new, tool.open, tool.save, tool.undo, tool.redo];

export const ribbonTabs: RibbonTab[] = [
  {
    id: "home",
    title: "Home",
    panels: [
      { id: "draw", title: "Draw", tools: [tool.line, tool.circle, tool.rectangle] },
      { id: "modify", title: "Modify", tools: [tool.move, tool.copy, tool.erase] },
    ],
  },
  {
    id: "view",
    title: "View",
    panels: [
      { id: "navigate", title: "Navigate", tools: [tool.pan, tool.zoom, tool.fit] },
      { id: "display", title: "Display", tools: [tool.grid, tool.snap, tool.rulers] },
    ],
  },
];

export const sidePanelGroups: SidePanelGroup[] = [
  { id: "favorites", title: "Favorites", tools: [tool.line, tool.circle, tool.move, tool.erase] },
  { id: "assistance", title: "Assistance", tools: [tool.help, tool.clear] },
];
