<script setup lang="ts">
import StatusBar from "../components/StatusBar.vue";
import { useStatusBar } from "../composables/useStatusBar.ts";

// Not destructured: templates only unwrap top-level refs, and the
// ReadonlyValue fields are read with `.value`.
const statusBar = useStatusBar();
</script>

<template>
  <footer
    class="[grid-area:status] h-6 px-2 flex items-center bg-surface border-t border-line text-xs text-muted"
  >
    <StatusBar :cursor="statusBar.cursor.value" />
  </footer>
</template>
