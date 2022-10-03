<script setup>
// import { RouterLink } from "vue-router";
import { useFeedStore } from "../stores/Feed";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const feedStore = useFeedStore();
const props = defineProps(["feedType"]);
const feed = ref(props.feedType + "Feed");
watch(
  () => route.params,
  (toParams) => {
    feed.value = toParams.feedType + "Feed";
  }
);
</script>

<template>
  <div v-for="post in feedStore[feed]" :key="post.rating">
    <h2>{{ post.title }}</h2>
    <p>{{ new Date(post.date) }} ||| {{ post.rating }}</p>
  </div>
</template>
