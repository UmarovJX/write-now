<template>
  <div class="loader" :style="styles"></div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  size: {
    type: Number,
    default: 40,
  },
  borderColor: {
    type: String,
    default: "black",
  },
  borderSize: {
    type: Number,
    default: 4,
  },
});

const styles = computed(() => {
  return {
    width: props.size + "px",
    height: props.size + "px",
    border: props.borderSize + "px solid transparent",
    borderTop: props.borderSize + "px solid " + props.borderColor,
  };
});
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
