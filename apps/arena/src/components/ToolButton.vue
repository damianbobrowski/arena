<script setup lang="ts">
import type { ToolButtonEmits, ToolButtonProps } from "@arena/core";
import IconButton from "./IconButton.vue";

defineProps<ToolButtonProps>();
defineEmits<ToolButtonEmits>();
</script>

<!-- large: icon above its label (Ribbon). small: icon only, label as tooltip. -->
<template>
  <button
    v-if="size === 'large'"
    type="button"
    class="flex flex-col items-center gap-1 min-w-12 px-1.5 py-1 rounded text-xs text-text hover:bg-raised focus-visible:outline-1 focus-visible:outline-accent"
    :title="tool.label"
    @click="$emit('run', tool.command)"
  >
    <span :class="tool.icon" class="text-xl" aria-hidden="true" />
    <span>{{ tool.label }}</span>
  </button>
  <IconButton
    v-else
    :icon="tool.icon ?? ''"
    :label="tool.label"
    @click="$emit('run', tool.command)"
  />
</template>
