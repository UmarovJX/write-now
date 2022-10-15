<script setup>
// import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useGlobalState } from "../stores/GlobalState";
import { usePosts } from "../helpers/usePosts";
import { useComments } from "../helpers/useComments";

import PostCard from "../components/PostCard.vue";
import CommentList from "../components/CommentList.vue";
import BaseLoader from "../components/base/BaseLoader.vue";
const props = defineProps(["id"]);

const globalState = useGlobalState();
const { post, getPost } = usePosts();
const { comments, commentsNumber, getComments, commentsLoading } =
  useComments();

const page = ref(1);
getPost(props.id);
getComments({
  parentType: "post",
  refers: props.id,
  limit: globalState.value.commentLimit,
  page: page.value,
});
const getMoreComments = () => {
  if (!commentsLoading.value)
    getComments({
      parentType: "post",
      refers: props.id,
      limit: globalState.value.commentLimit,
      page: ++page.value,
    });
};
</script>

<template>
  <div v-if="post">
    <post-card :post="post"></post-card>
    <div id="comments" class="border-2 rounded-md mx-2 bg-indigo-400 shadow-xl">
      <CommentList v-if="comments" :comments="comments"></CommentList>
      <button
        class="px-3 py-2 mx-auto border-2 border-black rounded-full bg-teal-400 ml-auto block"
        v-if="
          comments.length > 0 &&
          comments.length < commentsNumber &&
          !commentsLoading
        "
        @click="getMoreComments"
      >
        DOWNLOAD MORE
      </button>
      <BaseLoader v-if="commentsLoading" class="loader mx-auto"></BaseLoader>
    </div>
  </div>
</template>

<style></style>
