<script setup>
import { useGlobalState } from "../stores/GlobalState";
import { usePosts } from "../helpers/usePosts";
import { useUsers } from "../helpers/useUsers";
import { ref, watch } from "vue";
import PostList from "../components/PostList.vue";
import BasePagination from "../components/base/BasePagination.vue";
const props = defineProps({ id: { type: Number, default: 1 } });
const globalState = useGlobalState();
const { posts, num, getPosts } = usePosts();
const { user, getUser } = useUsers();
getUser(props.id);
getPosts("user", {
  limit: globalState.value.queryLimit,
  page: 1,
  userId: props.id,
});
const page = ref(1);
watch(page, () => {
  getPosts("user", {
    limit: globalState.value.queryLimit,
    page: page.value,
    userId: props.id,
  });
});
</script>

<template>
  <div>
    <div
      v-if="user"
      class="p-4 pb-2 m-2 border rounded border-green-500 bg-indigo-400 shadow-xl"
    >
      <div class="flex mb-2 items-center">
        <img
          :src="user.avatar + '?set=set5'"
          alt=""
          class="bg-white aspect-square w-36 border rounded-full mr-4"
        />
        <div>
          <h3 class="text-2xl">{{ user.name }}</h3>
          <h4>Posts written: {{ user.posts }}</h4>
          <h4>Posts liked: {{ user.likes }}</h4>
          <h4>Posts disliked: {{ user.dislikes }}</h4>
        </div>
      </div>
    </div>
    <div v-if="posts.length > 0">
      <PostList :posts="posts"> </PostList>
      <BasePagination v-model="page" :max-pages="num"></BasePagination>
    </div>
  </div>
</template>
