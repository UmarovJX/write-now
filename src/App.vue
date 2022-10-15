<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="flex-col w-full min-h-screen">
    <AppHeader class="container mx-auto" />
    <RouterView class="container mx-auto" />
  </div>
</template>

<style></style>
