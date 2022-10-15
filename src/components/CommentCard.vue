<template>
  <div
    :class="[lvls[level], level == 1 ? 'ml-2' : '']"
    class="border-b-2 border-x-2 rounded-xl border-cyan-900 m-1"
  >
    <div
      class="flex flex-col md:flex-row items-start pt-2 border-2 border-cyan-700 rounded-xl mb-1 bg-indigo-300"
    >
      <RouterLink :to="{ name: 'user', params: { id: comment.user_id } }">
        <div class="flex items-center w-40">
          <img
            :src="comment.avatar + '?set=set5'"
            alt=""
            class="bg-white aspect-square w-12 border rounded-full ml-2"
          />
          <div>
            <h4>{{ comment.name }}</h4>
            <p class="text-sm">{{ timeAgo }}</p>
            <p>{{ comment.count }} replies</p>
          </div>
        </div>
      </RouterLink>
      <div
        class="w-full md:w-1 border rounded mb-2 bg-cyan-900 border-cyan-900 self-stretch"
      ></div>
      <div class="grow pl-2">
        <p>{{ comment.content }}</p>
      </div>

      <i
        class="px-3 py-2 mr-1 border-2 border-black rounded-full bg-teal-400 mb-1 fa-solid self-end"
        :class="showComments ? 'fa-angles-up' : 'fa-angles-down'"
        v-if="comments.length > 0"
        @click="showComments = !showComments"
      ></i>
    </div>
    <CommentList
      v-if="comments && showComments"
      :level="level + 1"
      :comments="comments"
    ></CommentList>
    <div class="pl-2 py-1 flex justify-center">
      <button
        @click="loadComments"
        v-if="
          comment.count && !commentsLoading && comments.length != comment.count
        "
        class="px-2 border border-black rounded-xl bg-teal-400"
      >
        Load Replies
      </button>

      <BaseLoader v-if="commentsLoading" class="mx-auto"></BaseLoader>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useTimeAgo } from "@vueuse/core";
import CommentList from "./CommentList.vue";
import { useComments } from "../helpers/useComments";
import { useGlobalState } from "../stores/GlobalState";
import BaseLoader from "../components/base/BaseLoader.vue";
const timeAgo = useTimeAgo(props.comment.date);
const props = defineProps({
  comment: { type: Object, required: true },
  level: { type: Number, default: 1 },
});
const globalState = useGlobalState();
const { comments, getComments, commentsLoading } = useComments();
const page = ref(0);
const showComments = ref(true);
const loadComments = () => {
  if (!commentsLoading.value)
    getComments({
      parentType: "comment",
      refers: props.comment.id,
      limit: globalState.value.commentLimit,
      page: ++page.value,
    });
};

const lvls = {
  1: "ml-4",
  2: "ml-8",
  3: "ml-12",
  4: "ml-16",
};
</script>

<style scoped>
img {
  aspect-ratio: 1/1;
  border-radius: 100%;
  border: 2px solid gray;
  margin-right: 0.5rem;
}
</style>
