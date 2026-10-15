<script setup lang="ts">
import type { IconButtonEmits, IconButtonProps } from "@arena/core";

defineProps<IconButtonProps>();
defineEmits<IconButtonEmits>();
</script>

<template>
  <button
    type="button"
    class="grid place-items-center size-6 rounded text-muted hover:bg-raised hover:text-text focus-visible:outline-1 focus-visible:outline-accent"
    :title="label"
    :aria-label="label"
    @click="$emit('click')"
  >
    <span :class="icon" aria-hidden="true" />
  </button>
</template>
