<template>
  <div
    class="p-4 pb-2 m-2 border rounded border-green-500 bg-indigo-400 shadow-xl"
  >
    <RouterLink :to="{ name: 'user', params: { id: post.author_id } }">
      <div class="flex mb-2 items-center">
        <img
          :src="props.post.avatar + '?set=set5'"
          alt=""
          class="bg-white aspect-square w-12 border rounded-full mr-4"
        />
        <div>
          <h4>{{ props.post.name }}</h4>
          <p class="text-sm">{{ timeAgo }}</p>
        </div>
      </div>
    </RouterLink>

    <RouterLink
      class="text-2xl"
      :to="{
        name: 'post',
        params: { id: props.post.id },
      }"
      >{{ props.post.title }}</RouterLink
    >

    <p class="my-2">{{ props.post.content }}</p>
    <div class="flex justify-between px-4 py-1 border-t-2 border-gray-700">
      <div>
        <i class="fa-regular fa-comment-dots mr-2"></i>
        {{ props.post.comment_number }}
      </div>
      <div>
        <i
          class="fa-regular fa-thumbs-up mx-4 p-1 rounded-full border bg-white border-gray-500"
        ></i>
        {{ props.post.likes }}<span class="mx-4 text-lg">|</span
        >{{ props.post.dislikes
        }}<i
          class="fa-regular fa-thumbs-down mx-4 p-1 rounded-full border bg-white"
        ></i>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTimeAgo } from "@vueuse/core";

const timeAgo = useTimeAgo(props.post.date);
const props = defineProps(["post"]);
</script>
<style scoped></style>
