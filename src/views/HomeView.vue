<script setup>
// import { RouterLink } from "vue-router";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalState } from "../stores/GlobalState";

import FeedPagination from "../components/FeedPagination.vue";
import PostList from "../components/PostList.vue";

import { usePosts } from "../helpers/usePosts";
const { posts, num, getPosts } = usePosts();
const globalState = useGlobalState();
const route = useRoute();
const router = useRouter();
const props = defineProps(["feedType"]);
if (props.feedType === "subs" && !globalState.value.user)
  router.push({ name: "feed", params: { feedType: "best" } });
getPosts(props.feedType, route.query);
watch(
  () => [route.params, route.query],
  () => {
    getPosts(props.feedType, route.query);
    window.scrollTo(0, 0);
  }
);
</script>

<template>
  <div v-if="posts.length > 0">
    <post-list :posts="posts"> </post-list>
    <feed-pagination
      :limit="+route.query.limit"
      :page="+route.query.page"
      :num="num"
      :feed-type="props.feedType"
    ></feed-pagination>
  </div>
</template>
