<script setup lang="ts">
import type { RibbonPanelViewEmits, RibbonPanelViewProps } from "@arena/core";
import ToolButton from "./ToolButton.vue";

defineProps<RibbonPanelViewProps>();
defineEmits<RibbonPanelViewEmits>();
</script>

<template>
  <section
    :aria-label="panel.title"
    class="flex flex-col items-center gap-0.5 px-2 border-r border-line last:border-r-0"
  >
    <div class="flex items-start gap-0.5">
      <ToolButton
        v-for="tool in panel.tools"
        :key="tool.id"
        :tool="tool"
        size="large"
        @run="$emit('run', $event)"
      />
    </div>
    <h3 class="m-0 text-xs font-normal text-muted">{{ panel.title }}</h3>
  </section>
</template>
