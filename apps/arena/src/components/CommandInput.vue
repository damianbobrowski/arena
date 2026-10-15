<script setup lang="ts">
import type { CommandInputEmits, CommandInputProps } from "@arena/core";

defineProps<CommandInputProps>();
const emit = defineEmits<CommandInputEmits>();
</script>

<template>
  <label class="flex items-center gap-2 h-7 px-2 border-t border-line">
    <span class="i-lucide-chevron-right text-muted shrink-0" aria-hidden="true" />
    <span class="sr-only">Command</span>
    <input
      type="text"
      class="flex-1 min-w-0 bg-transparent text-text outline-none placeholder:text-muted"
      placeholder="Type a command"
      autocomplete="off"
      spellcheck="false"
      :value="value"
      @input="emit('input', ($event.target as HTMLInputElement).value)"
      @keydown.enter.prevent="emit('submit')"
    />
  </label>
</template>
