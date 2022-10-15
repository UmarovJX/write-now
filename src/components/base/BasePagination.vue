<template>
  <div class="pagination">
    <button
      @click="$emit('update:modelValue', modelValue - 1)"
      :disabled="modelValue === 1"
    >
      &#8810;
    </button>

    <button @click="$emit('update:modelValue', 1)" v-if="modelValue > 1">
      1
    </button>

    <button
      @click="$emit('update:modelValue', 2)"
      v-bind="$attrs"
      v-if="modelValue > 3"
      disabled
    >
      &#x2026;
    </button>

    <button
      @click="$emit('update:modelValue', modelValue - 1)"
      v-if="modelValue > 2"
    >
      {{ modelValue - 1 }}
    </button>
    <button disabled>{{ modelValue }}</button>
    <button
      @click="$emit('update:modelValue', modelValue + 1)"
      v-if="modelValue < maxPages - 1"
    >
      {{ modelValue + 1 }}
    </button>

    <button v-if="modelValue < maxPages - 1" disabled>&#x2026;</button>
    <button
      @click="$emit('update:modelValue', maxPages)"
      v-if="modelValue < maxPages"
    >
      {{ maxPages }}
    </button>
    <button
      @click="$emit('update:modelValue', modelValue + 1)"
      :disabled="modelValue === maxPages"
    >
      &#8811;
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  maxPages: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
button {
  border: 2px solid red;
  margin: 3px;
  width: 50px;
}
button:disabled {
  background-color: rgb(150, 150, 150);
}
</style>
