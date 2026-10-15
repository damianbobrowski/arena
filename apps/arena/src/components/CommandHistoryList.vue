<script setup lang="ts">
import type { CommandHistoryEntry, CommandHistoryListProps } from "@arena/core";

defineProps<CommandHistoryListProps>();

const kindClass: Record<CommandHistoryEntry["kind"], string> = {
  command: "text-text",
  message: "text-muted",
  error: "text-danger",
};
</script>

<template>
  <!-- column-reverse keeps the scroll anchored to the newest entry -->
  <div class="flex flex-col-reverse min-h-0 overflow-y-auto px-2" role="log" aria-live="polite">
    <ol class="py-1">
      <li
        v-for="(entry, index) in entries"
        :key="index"
        class="whitespace-pre-wrap break-words leading-5"
        :class="kindClass[entry.kind]"
      >
        {{ entry.text }}
      </li>
    </ol>
  </div>
</template>
