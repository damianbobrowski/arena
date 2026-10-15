export type CommandName = string;

export interface Command {
  name: CommandName;
  label: string;
}

export interface Tool {
  id: string;
  command: CommandName;
  label: string;
  /** Full UnoCSS class, e.g. "i-lucide-square". */
  icon?: string;
}

export interface RibbonPanel {
  id: string;
  title: string;
  tools: readonly Tool[];
}

export interface RibbonTab {
  id: string;
  title: string;
  panels: readonly RibbonPanel[];
}

export interface SidePanelGroup {
  id: string;
  title: string;
  tools: readonly Tool[];
}
