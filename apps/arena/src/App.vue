<script setup lang="ts">
// The Shell grid.
import ApplicationMenuRegion from "./regions/ApplicationMenuRegion.vue";
import CommandLineRegion from "./regions/CommandLineRegion.vue";
import QuickAccessRegion from "./regions/QuickAccessRegion.vue";
import RibbonRegion from "./regions/RibbonRegion.vue";
import SidePanelRegion from "./regions/SidePanelRegion.vue";
import StatusBarRegion from "./regions/StatusBarRegion.vue";
import ViewportAreaRegion from "./regions/ViewportAreaRegion.vue";
</script>

<template>
  <div
    class="grid h-screen overflow-hidden bg-base text-text text-sm grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr_auto_auto] [grid-template-areas:'top_top''ribbon_ribbon''viewport_side''cmd_side''status_status']"
  >
    <header
      class="[grid-area:top] flex items-center gap-2 px-2 h-8 bg-surface border-b border-line"
    >
      <ApplicationMenuRegion />
      <QuickAccessRegion />
    </header>
    <section class="[grid-area:ribbon] px-2 pt-1 bg-surface border-b border-line">
      <RibbonRegion />
    </section>
    <ViewportAreaRegion />
    <SidePanelRegion />
    <CommandLineRegion />
    <StatusBarRegion />
  </div>
</template>
