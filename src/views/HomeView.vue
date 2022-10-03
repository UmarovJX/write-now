<script setup>
import { RouterLink } from "vue-router";

const props = defineProps(["feedType"]);
</script>

<template>
  <main>{{ props.feedType }}</main>
  <RouterLink to="/post">Post</RouterLink>
  <RouterLink to="/post">Post1</RouterLink>

  <RouterLink to="/post">Post2</RouterLink>
</template>
