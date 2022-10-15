<script setup>
import PostCard from "./PostCard.vue";
const props = defineProps(["posts"]);
</script>

<template>
  <template v-for="item in props.posts" :key="item.post_id">
    <post-card :post="item"></post-card>
  </template>
</template>
