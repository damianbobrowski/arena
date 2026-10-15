<script setup lang="ts">
import type { SidePanelGroupViewEmits, SidePanelGroupViewProps } from "@arena/core";
import ToolButton from "./ToolButton.vue";

defineProps<SidePanelGroupViewProps>();
defineEmits<SidePanelGroupViewEmits>();
</script>

<template>
  <section :aria-label="group.title" class="flex flex-col gap-1 py-2 border-b border-line">
    <h3 class="m-0 px-1 text-xs font-normal text-muted">{{ group.title }}</h3>
    <div class="flex flex-wrap items-start gap-0.5">
      <ToolButton
        v-for="tool in group.tools"
        :key="tool.id"
        :tool="tool"
        size="large"
        @run="$emit('run', $event)"
      />
    </div>
  </section>
</template>
