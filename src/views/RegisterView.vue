<template>
  <div class="container mx-auto">
    <form @submit.prevent="sendForm" class="px-4 my-32 mx-auto max-w-2xl">
      <fieldset>
        <legend class="my-3 p-2 text-center text-3xl font-semibold">
          Sign up the Write-Now
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
          v-model="email"
          label="Email"
          type="email"
          class="border border-gray-700 py-2 px-4 block rounded my-2 w-full focus:outline-none focus:border-teal-400 focus:drop-shadow-xl"
          :class="emailError ? errorClasses : ''"
          :error="emailError"
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
        <BaseInput
          required
          v-model="password2"
          label="Confirm password"
          type="password"
          class="border border-gray-700 py-2 px-4 block rounded my-2 w-full focus:outline-none focus:border-teal-400 focus:drop-shadow-xl"
          :class="password2Error ? errorClasses : ''"
          :error="password2Error"
        />
      </fieldset>
      <div>{{ formError }}</div>
      <button class="border rounded p-2" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "../components/base/BaseInput.vue";

const router = useRouter();
const errorClasses = "border-red-600 focus:border-red-600 focus:outline-none";

const login = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const formError = ref("");

const loginError = computed(() => {
  if (!login.value.length) return null;
  if (login.value.length < 6) return "Login must be at least 6 characters";
  if (!login.value.match(/^[a-zA-Z0-9_]+$/))
    return "Login can have Only alphanumeric characters and underscore";
  return null;
});
const emailError = computed(() => {
  if (!email.value.length) return null;
  if (email.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,8}$/g)) return null;
  return "Please enter valid email";
});
const password2Error = computed(() => {
  if (password2.value && password.value !== password2.value)
    return "Passwords don't match";
  return null;
});
const passwordError = computed(() => {
  if (password.value && password.value.length < 6)
    return "Password is too short";
  return null;
});

const sendForm = async () => {
  if (loginError.value || emailError.value || passwordError.value) return;
  formError.value = "";
  try {
    const response = await fetch("http://127.0.0.1:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: login.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      formError.value = (data && data.message) || response.status;
      alert(JSON.stringify(data));
      return;
    }
    router.push({ name: "login" });
  } catch (error) {
    formError.value = error.message;
  }
};
</script>
