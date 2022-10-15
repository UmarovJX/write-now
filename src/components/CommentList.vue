<script setup>
import CommentCard from "./CommentCard.vue";
defineProps({
  comments: {
    type: Array,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <template v-for="comment in comments" :key="comment.id">
    <CommentCard :comment="comment" :level="level"></CommentCard>
  </template>
</template>
