<template>
  <header class="container my-2 flex items-center p-2">
    <span
      @click="goHome"
      class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 py-0 mr-4 flex-none border border-red-700 rounded select-none cursor-pointer"
    >
      Write<br />
      Now
    </span>
    <nav class="flex items-center flex-none">
      <template v-for="(data, i) in linkData" :key="data.params.feedType">
        <RouterLink
          v-if="data.params.feedType !== 'subs' || globalState.user"
          :to="data"
          :class="(i < linkData.length - 1 ? 'mr-4' : '') + ' uppercase'"
          >{{ data.params.feedType }}
        </RouterLink>
      </template>
    </nav>
    <div class="grow"></div>
    <AuthCard class="self-stretch"></AuthCard>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useGlobalState } from "../stores/GlobalState";
import AuthCard from "./AuthCard.vue";
const globalState = useGlobalState();
const router = useRouter();
const linkData = [
  {
    name: "feed",
    params: { feedType: "best" },
    query: { page: 1, limit: globalState.value.queryLimit },
  },
  {
    name: "feed",
    params: { feedType: "new" },
    query: { page: 1, limit: globalState.value.queryLimit },
  },
  {
    name: "feed",
    params: { feedType: "subs" },
    query: { page: 1, limit: globalState.value.queryLimit },
  },
];

const goHome = () => {
  router.push({ path: "/" });
};
</script>

<style></style>
