<script setup lang="ts">
import CommandHistoryList from "../components/CommandHistoryList.vue";
import CommandInput from "../components/CommandInput.vue";
import Splitter from "../components/Splitter.vue";
import { useCommandLine } from "../composables/useCommandLine.ts";

// Not destructured: templates only unwrap top-level refs, and the
// ReadonlyValue fields are read with `.value`.
const commandLine = useCommandLine();
</script>

<template>
  <section
    class="[grid-area:cmd] flex flex-col min-h-0 bg-surface font-mono"
    aria-label="Command Line"
    :style="{ height: `${commandLine.commandLine.value.height}px` }"
  >
    <Splitter
      orientation="horizontal"
      reverse
      :size="commandLine.commandLine.value.height"
      @resize="commandLine.setHeight"
    />
    <CommandHistoryList class="flex-1" :entries="commandLine.history.value" />
    <CommandInput
      :value="commandLine.input.value"
      @input="commandLine.setInput"
      @submit="commandLine.submit"
    />
  </section>
</template>
