import { quickAccessTools, runCommand, type UseQuickAccess } from "@arena/core";

export function useQuickAccess(): UseQuickAccess {
  return { tools: quickAccessTools, runCommand };
}
