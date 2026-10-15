<script setup lang="ts">
import type { StatusBarProps } from "@arena/core";

defineProps<StatusBarProps>();
</script>

<template>
  <span class="font-mono tabular-nums">X: {{ cursor.x }} Y: {{ cursor.y }}</span>
</template>
