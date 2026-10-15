<script setup lang="ts">
import type { ViewportEmits } from "@arena/core";

const emit = defineEmits<ViewportEmits>();

function onPointerMove(event: PointerEvent): void {
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
  emit("pointerMove", {
    x: Math.round(event.clientX - bounds.left),
    y: Math.round(event.clientY - bounds.top),
  });
}
</script>

<template>
  <div class="size-full bg-base cursor-crosshair" @pointermove="onPointerMove" />
</template>
