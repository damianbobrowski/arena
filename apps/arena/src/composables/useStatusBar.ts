import { $cursorPosition, type UseStatusBar } from "@arena/core";
import { useStore } from "@nanostores/vue";

export function useStatusBar(): UseStatusBar {
  return { cursor: useStore($cursorPosition) };
}
