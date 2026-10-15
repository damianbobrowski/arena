<script setup lang="ts">
import IconButton from "../components/IconButton.vue";
import SidePanelGroupView from "../components/SidePanelGroupView.vue";
import Splitter from "../components/Splitter.vue";
import { useSidePanel } from "../composables/useSidePanel.ts";

// Not destructured: templates only unwrap top-level refs, and the
// ReadonlyValue fields are read with `.value`.
const sidePanel = useSidePanel();
</script>

<template>
  <aside
    v-if="sidePanel.sidePanel.value.collapsed"
    class="[grid-area:side] flex flex-col items-center w-8 py-1 bg-surface border-l border-line"
    aria-label="Side Panel"
  >
    <IconButton
      icon="i-lucide-panel-right-open"
      label="Expand Side Panel"
      :aria-expanded="false"
      @click="sidePanel.toggle"
    />
  </aside>
  <aside
    v-else
    class="[grid-area:side] flex min-h-0 bg-surface"
    aria-label="Side Panel"
    :style="{ width: `${sidePanel.sidePanel.value.width}px` }"
  >
    <Splitter
      orientation="vertical"
      reverse
      :size="sidePanel.sidePanel.value.width"
      @resize="sidePanel.setWidth"
    />
    <div class="flex flex-col flex-1 min-w-0 min-h-0">
      <div class="flex items-center h-8 px-2 border-b border-line">
        <h2 class="m-0 text-xs font-semibold text-muted">Side Panel</h2>
        <IconButton
          class="ml-auto"
          icon="i-lucide-panel-right-close"
          label="Collapse Side Panel"
          :aria-expanded="true"
          @click="sidePanel.toggle"
        />
      </div>
      <div class="flex-1 min-h-0 overflow-y-auto px-2">
        <SidePanelGroupView
          v-for="group in sidePanel.groups"
          :key="group.id"
          :group="group"
          @run="sidePanel.runCommand"
        />
      </div>
    </div>
  </aside>
</template>
