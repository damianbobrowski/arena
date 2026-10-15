<script setup lang="ts">
import type { RibbonTabBarEmits, RibbonTabBarProps } from "@arena/core";
import IconButton from "./IconButton.vue";

defineProps<RibbonTabBarProps>();
defineEmits<RibbonTabBarEmits>();
</script>

<template>
  <div class="flex items-center gap-0.5 h-7">
    <div role="tablist" aria-label="Ribbon" class="flex items-center gap-0.5">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="tab.id === activeTabId"
        class="px-3 py-0.5 rounded hover:bg-raised focus-visible:outline-1 focus-visible:outline-accent"
        :class="tab.id === activeTabId ? 'text-text bg-raised' : 'text-muted'"
        @click="$emit('select', tab.id)"
      >
        {{ tab.title }}
      </button>
    </div>
    <IconButton
      class="ml-auto"
      :icon="minimized ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'"
      :label="minimized ? 'Expand Ribbon' : 'Minimize Ribbon'"
      :aria-expanded="!minimized"
      @click="$emit('toggleMinimized')"
    />
  </div>
</template>
