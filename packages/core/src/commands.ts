import { atom } from "nanostores";
import type { Command, CommandHistoryEntry, CommandName } from "./model/index.ts";

/** In memory. */
export const $commandHistory = atom<CommandHistoryEntry[]>([]);

function append(...entries: CommandHistoryEntry[]): void {
  $commandHistory.set([...$commandHistory.get(), ...entries]);
}

/** Placeholder Commands: running one only records it in the Command History. */
const placeholderCommands: Command[] = [
  { name: "NEW", label: "New" },
  { name: "OPEN", label: "Open" },
  { name: "SAVE", label: "Save" },
  { name: "CLOSE", label: "Close" },
  { name: "UNDO", label: "Undo" },
  { name: "REDO", label: "Redo" },
  { name: "LINE", label: "Line" },
  { name: "CIRCLE", label: "Circle" },
  { name: "RECTANGLE", label: "Rectangle" },
  { name: "MOVE", label: "Move" },
  { name: "COPY", label: "Copy" },
  { name: "ERASE", label: "Erase" },
  { name: "PAN", label: "Pan" },
  { name: "ZOOM", label: "Zoom" },
  { name: "FIT", label: "Fit" },
  { name: "GRID", label: "Grid" },
  { name: "SNAP", label: "Snap" },
  { name: "RULERS", label: "Rulers" },
];

const builtInCommands: [Command, () => void][] = [
  [{ name: "CLEAR", label: "Clear the Command History" }, () => $commandHistory.set([])],
  [
    { name: "HELP", label: "List every Command" },
    () =>
      append(
        ...commands.map((c): CommandHistoryEntry => ({
          kind: "message",
          text: `${c.name} — ${c.label}`,
        })),
      ),
  ],
];

/** Every registered Command, placeholders first, then built-ins. */
export const commands: readonly Command[] = [
  ...placeholderCommands,
  ...builtInCommands.map(([command]) => command),
];

const registry = new Map<CommandName, () => void>([
  ...placeholderCommands.map((command): [CommandName, () => void] => [
    command.name,
    () => append({ kind: "command", text: `Command ${command.name}` }),
  ]),
  ...builtInCommands.map(([command, run]): [CommandName, () => void] => [command.name, run]),
]);

/** The single dispatch path for every Tool and every typed Command name. */
export function runCommand(name: CommandName): void {
  const normalized = name.trim().toUpperCase();
  const run = registry.get(normalized);
  if (run) run();
  else append({ kind: "error", text: `Unknown command "${normalized}"` });
}

/** In memory: the text typed into the Command Line. */
export const $commandInput = atom("");

export function setCommandInput(text: string): void {
  $commandInput.set(text);
}

/** Runs the typed Command, if any, and empties the input. */
export function submitCommandInput(): void {
  const typed = $commandInput.get().trim();
  $commandInput.set("");
  if (typed) runCommand(typed);
}
