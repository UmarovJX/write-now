<template>
  <div class="container mx-auto">
    <form @submit.prevent="sendForm" class="px-4 my-32 mx-auto max-w-2xl">
      <fieldset>
        <legend class="my-3 p-2 text-center text-3xl font-semibold">
          Sign in
        </legend>

        <BaseInput
          required
          v-model="login"
          label="Login"
          type="text"
          class="border border-gray-700 py-2 px-4 block rounded my-2 w-full focus:outline-none focus:border-teal-400 focus:drop-shadow-xl"
          :class="loginError ? errorClasses : ''"
          :error="loginError"
        />

        <BaseInput
          required
          v-model="password"
          label="Password"
          type="password"
          class="border border-gray-700 py-2 px-4 block rounded my-2 w-full focus:outline-none focus:border-teal-400 focus:drop-shadow-xl"
          :class="passwordError ? errorClasses : ''"
          :error="passwordError"
        />
      </fieldset>
      <p>{{ formError }}</p>
      <button class="border rounded p-2" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "../components/base/BaseInput.vue";
import { useGlobalState } from "../stores/GlobalState";

const router = useRouter();
const globalState = useGlobalState();

const errorClasses = "border-red-600 focus:border-red-600 focus:outline-none";

const login = ref("");
const password = ref("");
const formError = ref(null);

const loginError = computed(() => {
  if (!login.value.length) return null;
  if (login.value.length < 6) return "Login must be at least 6 characters";
  if (!login.value.match(/^[a-zA-Z0-9_]+$/))
    return "Login can have Only alphanumeric characters and underscore";
  return null;
});

const passwordError = computed(() => {
  if (password.value && password.value.length < 6)
    return "Password is too short";
  return null;
});

const sendForm = async () => {
  if (loginError.value || passwordError.value) return;
  fetch("http://127.0.0.1:3000/api/auth/login", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: login.value,
      password: password.value,
    }),
  })
    .then(async (response) => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      globalState.value.user = data;
      router.push("/");
    })
    .catch((error) => {
      formError.value = error;
    });
};
</script>
