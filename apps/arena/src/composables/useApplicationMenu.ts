import { applicationMenuItems, runCommand, type UseApplicationMenu } from "@arena/core";

export function useApplicationMenu(): UseApplicationMenu {
  return { items: applicationMenuItems, runCommand };
}
