import { beforeEach, describe, expect, it } from "vite-plus/test";
import { type Core, freshCore } from "./fresh-core.ts";

let core: Core;

beforeEach(async () => {
  core = await freshCore();
});

describe("runCommand", () => {
  it("matches Command names case-insensitively", () => {
    core.runCommand("line");
    core.runCommand("LiNe");
    expect(core.$commandHistory.get()).toEqual([
      { kind: "command", text: "Command LINE" },
      { kind: "command", text: "Command LINE" },
    ]);
  });

  it("records an error and runs nothing for an unknown name", () => {
    core.runCommand("FOO");
    expect(core.$commandHistory.get()).toEqual([{ kind: "error", text: 'Unknown command "FOO"' }]);
  });

  it("names an unknown typed Command by its normalized name", () => {
    core.runCommand("  foo ");
    expect(core.$commandHistory.get()).toEqual([{ kind: "error", text: 'Unknown command "FOO"' }]);
  });
});

describe("submitCommandInput", () => {
  it("runs the typed Command and empties the input", () => {
    core.setCommandInput("  circle ");
    core.submitCommandInput();
    expect(core.$commandHistory.get()).toEqual([{ kind: "command", text: "Command CIRCLE" }]);
    expect(core.$commandInput.get()).toBe("");
  });

  it("does nothing when the input is blank", () => {
    core.setCommandInput("   ");
    core.submitCommandInput();
    expect(core.$commandHistory.get()).toEqual([]);
  });
});

describe("built-in Commands", () => {
  it("CLEAR empties the Command History", () => {
    core.runCommand("LINE");
    core.runCommand("FOO");
    core.runCommand("clear");
    expect(core.$commandHistory.get()).toEqual([]);
  });

  it("HELP lists every Command as a message", () => {
    core.runCommand("help");
    const history = core.$commandHistory.get();
    expect(history).toContainEqual({ kind: "message", text: "LINE — Line" });
    expect(history).toContainEqual({ kind: "message", text: "CLEAR — Clear the Command History" });
    expect(history).toContainEqual({ kind: "message", text: "HELP — List every Command" });
    expect(history.filter((e) => e.kind === "message")).toHaveLength(core.commands.length);
  });
});
