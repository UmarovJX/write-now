<template>
  <div
    class="border rounded border-black flex items-center p-1"
    v-if="!loading"
  >
    <template v-if="!globalState.user">
      <RouterLink
        :to="{ name: 'register' }"
        class="border rounded-xl px-2 bg-teal-400 border-gray-500 mx-2"
        >Sign Up</RouterLink
      >
      <RouterLink
        :to="{ name: 'login' }"
        class="border rounded-xl px-2 bg-teal-400 border-gray-500 mx-2"
        >Sign In</RouterLink
      >
    </template>
    <div v-else class="flex items-center">
      <img
        :src="globalState.user.avatar + '?set=set5'"
        alt=""
        class="bg-white aspect-square w-16 border border-gray-500 rounded-full mx-4"
      />

      <button
        class="border rounded-xl px-2 bg-teal-400 border-gray-500"
        @click="logOut"
      >
        Log Out
      </button>
    </div>
    <RouterLink :to="{ name: 'settings' }">
      <i
        class="fa-solid fa-gear p-1 m-2 border-gray-500 rounded-full border text-lg"
      ></i>
    </RouterLink>
  </div>
  <div v-else>LOADING!!!</div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { useGlobalState } from "../stores/GlobalState";
const router = useRouter();
const globalState = useGlobalState();
globalState.value.user = null;
const loading = ref(false);
const checkAuth = () => {
  loading.value = true;
  fetch(globalState.value.apiPath + "/auth/check", {
    mode: "cors",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((user) => {
      globalState.value.user = user;
      loading.value = false;
    });
};
checkAuth();
const logOut = () => {
  fetch(globalState.value.apiPath + "/auth/logout", {
    credentials: "include",
    method: "GET",
  })
    .then(async (response) => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      globalState.value.user = null;
      router.push({ name: "feed" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
