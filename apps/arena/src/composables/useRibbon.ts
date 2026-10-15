import {
  $activeRibbonTab,
  $ribbon,
  ribbonTabs,
  runCommand,
  selectRibbonTab,
  toggleRibbonMinimized,
  type UseRibbon,
} from "@arena/core";
import { useStore } from "@nanostores/vue";

export function useRibbon(): UseRibbon {
  return {
    tabs: ribbonTabs,
    ribbon: useStore($ribbon),
    activeTab: useStore($activeRibbonTab),
    selectTab: selectRibbonTab,
    toggleMinimized: toggleRibbonMinimized,
    runCommand,
  };
}
