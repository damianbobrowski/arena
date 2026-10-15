<script setup lang="ts">
import RibbonPanelView from "../components/RibbonPanelView.vue";
import RibbonTabBar from "../components/RibbonTabBar.vue";
import { useRibbon } from "../composables/useRibbon.ts";

// Not destructured: the template reads `.value` on the store refs explicitly.
const ribbon = useRibbon();
</script>

<template>
  <div class="flex flex-col">
    <RibbonTabBar
      :tabs="ribbon.tabs"
      :active-tab-id="ribbon.ribbon.value.activeTabId"
      :minimized="ribbon.ribbon.value.minimized"
      @select="ribbon.selectTab"
      @toggle-minimized="ribbon.toggleMinimized"
    />
    <div
      v-if="!ribbon.ribbon.value.minimized"
      role="tabpanel"
      :aria-label="ribbon.activeTab.value.title"
      class="flex items-stretch h-20 py-1"
    >
      <RibbonPanelView
        v-for="panel in ribbon.activeTab.value.panels"
        :key="panel.id"
        :panel="panel"
        @run="ribbon.runCommand"
      />
    </div>
  </div>
</template>
