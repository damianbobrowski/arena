import { setCursorPosition, type UseViewportArea } from "@arena/core";

export function useViewportArea(): UseViewportArea {
  return { setCursorPosition };
}
