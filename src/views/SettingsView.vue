<script setup>
import { useGlobalState } from "../stores/GlobalState";
import BaseInput from "../components/base/BaseInput.vue";
const globalState = useGlobalState();
</script>

<template>
  <div class="container mx-auto bg-gray-200 rounded-xl">
    <h2 class="text-lg text-center">Your Settings</h2>
    <fieldset class="p-2">
      <BaseInput
        class="p-1 ml-3 border rounded-lg bg-teal-100 border-gray-700 block"
        type="number"
        v-model="globalState.queryLimit"
        label="Posts per page:"
        :min="1"
        :max="20"
      ></BaseInput>
      <br />
      <BaseInput
        class="p-1 ml-3 border rounded-lg bg-teal-100 border-gray-700 block"
        type="number"
        v-model="globalState.commentLimit"
        label="Comments count per query:"
        :min="1"
        :max="30"
      ></BaseInput>
    </fieldset>
  </div>
</template>
