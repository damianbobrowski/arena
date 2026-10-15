import {
  $sidePanel,
  runCommand,
  setSidePanelWidth,
  sidePanelGroups,
  toggleSidePanel,
  type UseSidePanel,
} from "@arena/core";
import { useStore } from "@nanostores/vue";

export function useSidePanel(): UseSidePanel {
  return {
    groups: sidePanelGroups,
    sidePanel: useStore($sidePanel),
    setWidth: setSidePanelWidth,
    toggle: toggleSidePanel,
    runCommand,
  };
}
