<script setup lang="ts">
import type { SplitterEmits, SplitterProps } from "@arena/core";

/**
 * A draggable bar that resizes one neighbouring Region.
 *
 * - `orientation` is the bar's own orientation: a `horizontal` bar lies between
 *   stacked Regions and resizes a height; a `vertical` bar lies between
 *   side-by-side Regions and resizes a width.
 * - `size` is the resized Region's current size in px.
 * - `reverse` means the resized Region lies after the bar (below or to the
 *   right), so dragging up or left grows it.
 *
 * Emits the unclamped size; the store clamps it.
 */
const props = defineProps<SplitterProps>();
const emit = defineEmits<SplitterEmits>();

const KEY_STEP = 16;

// Drag start, held only for the duration of one pointer capture.
let startPointer = 0;
let startSize = 0;

function pointerAxis(event: PointerEvent): number {
  return props.orientation === "horizontal" ? event.clientY : event.clientX;
}

function resizeBy(delta: number, from: number): void {
  emit("resize", from + (props.reverse ? -delta : delta));
}

function onPointerDown(event: PointerEvent): void {
  if (event.button !== 0) return;
  const bar = event.currentTarget as HTMLElement;
  bar.setPointerCapture(event.pointerId);
  startPointer = pointerAxis(event);
  startSize = props.size;
  event.preventDefault();
}

function onPointerMove(event: PointerEvent): void {
  const bar = event.currentTarget as HTMLElement;
  if (!bar.hasPointerCapture(event.pointerId)) return;
  resizeBy(pointerAxis(event) - startPointer, startSize);
}

function onKeyDown(event: KeyboardEvent): void {
  const [less, more] =
    props.orientation === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
  if (event.key !== less && event.key !== more) return;
  event.preventDefault();
  resizeBy(event.key === more ? KEY_STEP : -KEY_STEP, props.size);
}
</script>

<template>
  <div
    role="separator"
    tabindex="0"
    :aria-orientation="orientation"
    :aria-valuenow="size"
    class="shrink-0 touch-none select-none bg-line hover:bg-accent focus-visible:bg-accent focus-visible:outline-none transition-colors"
    :class="
      orientation === 'horizontal' ? 'h-1 w-full cursor-row-resize' : 'w-1 h-full cursor-col-resize'
    "
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @keydown="onKeyDown"
  />
</template>
