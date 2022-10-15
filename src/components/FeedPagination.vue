<template>
  <div class="pagination">
    <button @click="changeRoute(props.page - 1)" :disabled="props.page == 1">
      &#8810;
    </button>
    <button @click="changeRoute(1)" v-if="props.page > 1">1</button>
    <button v-if="props.page > 3" disabled>&#x2026;</button>

    <button @click="changeRoute(props.page - 1)" v-if="props.page > 2">
      {{ props.page - 1 }}
    </button>
    <button disabled>{{ props.page }}</button>
    <button
      @click="changeRoute(+props.page + 1)"
      v-if="props.page < props.num - 1"
    >
      {{ +props.page + 1 }}
    </button>

    <button v-if="props.page < props.num - 1" disabled>&#x2026;</button>
    <button @click="changeRoute(props.num)" v-if="props.page < props.num">
      {{ props.num }}
    </button>
    <button
      @click="changeRoute(+props.page + 1)"
      :disabled="props.page == props.num"
    >
      &#8811;
    </button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["limit", "page", "num", "feedType"]);
props;

const changeRoute = (page) => {
  router.push({
    name: "feed",
    params: { feedType: props.feedType },
    query: { limit: props.limit, page },
  });
};
</script>

<style scoped>
button {
  font-size: 2rem;
  margin: 2px;
  border: 1px solid black;
  padding: 0.8rem;
}
button[disabled] {
  background-color: gray;
}
.pagination {
  display: flex;
  padding: 20px;
}
</style>
