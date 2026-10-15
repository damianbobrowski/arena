<script setup lang="ts">
import type { QuickAccessToolbarEmits, QuickAccessToolbarProps } from "@arena/core";
import ToolButton from "./ToolButton.vue";

defineProps<QuickAccessToolbarProps>();
defineEmits<QuickAccessToolbarEmits>();
</script>

<template>
  <div role="toolbar" aria-label="Quick Access Toolbar" class="flex items-center gap-0.5">
    <ToolButton
      v-for="tool in tools"
      :key="tool.id"
      :tool="tool"
      size="small"
      @run="$emit('run', $event)"
    />
  </div>
</template>
