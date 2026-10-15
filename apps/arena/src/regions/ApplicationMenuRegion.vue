<script setup lang="ts">
import ApplicationMenu from "../components/ApplicationMenu.vue";
import { useApplicationMenu } from "../composables/useApplicationMenu.ts";

const applicationMenu = useApplicationMenu();
</script>

<template>
  <ApplicationMenu :items="applicationMenu.items" @run="applicationMenu.runCommand" />
</template>
