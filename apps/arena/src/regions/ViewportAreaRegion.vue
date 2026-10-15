<script setup lang="ts">
import Viewport from "../components/Viewport.vue";
import { useViewportArea } from "../composables/useViewportArea.ts";

const viewportArea = useViewportArea();
</script>

<template>
  <main class="[grid-area:viewport] min-h-0 min-w-0">
    <Viewport @pointer-move="viewportArea.setCursorPosition" />
  </main>
</template>
