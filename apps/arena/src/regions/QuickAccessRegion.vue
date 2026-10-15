<script setup lang="ts">
import QuickAccessToolbar from "../components/QuickAccessToolbar.vue";
import { useQuickAccess } from "../composables/useQuickAccess.ts";

const quickAccess = useQuickAccess();
</script>

<template>
  <QuickAccessToolbar :tools="quickAccess.tools" @run="quickAccess.runCommand" />
</template>
