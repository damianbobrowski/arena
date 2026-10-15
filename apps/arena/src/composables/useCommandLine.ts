import {
  $commandHistory,
  $commandInput,
  $commandLine,
  setCommandInput,
  setCommandLineHeight,
  submitCommandInput,
  type UseCommandLine,
} from "@arena/core";
import { useStore } from "@nanostores/vue";

export function useCommandLine(): UseCommandLine {
  return {
    history: useStore($commandHistory),
    input: useStore($commandInput),
    commandLine: useStore($commandLine),
    setInput: setCommandInput,
    submit: submitCommandInput,
    setHeight: setCommandLineHeight,
  };
}
