<script setup lang="ts">
import type { ApplicationMenuEmits, ApplicationMenuProps } from "@arena/core";
import { useId } from "vue";
import IconButton from "./IconButton.vue";

defineProps<ApplicationMenuProps>();
defineEmits<ApplicationMenuEmits>();

// Open/closed lives in the browser's native popover, not in app state.
const menuId = useId();
</script>

<template>
  <IconButton icon="i-lucide-menu" label="Application Menu" :popovertarget="menuId" />
  <div
    :id="menuId"
    popover
    role="menu"
    aria-label="Application Menu"
    class="m-0 inset-auto top-8 left-1 min-w-40 p-1 rounded bg-surface border border-line text-text shadow-lg"
  >
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      role="menuitem"
      class="flex w-full items-center gap-2 px-2 py-1 rounded text-left hover:bg-raised focus-visible:outline-1 focus-visible:outline-accent"
      :popovertarget="menuId"
      popovertargetaction="hide"
      @click="$emit('run', item.command)"
    >
      <span :class="item.icon" aria-hidden="true" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>
