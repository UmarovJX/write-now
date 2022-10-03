import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFeedStore = defineStore("feed", () => {
  const state = ref([
    { title: "Post №0", date: 1664779883812, rating: 233 },
    { title: "Post №1", date: 1664779863812, rating: 489 },
    { title: "Post №2", date: 1664779843812, rating: 612 },
    { title: "Post №3", date: 1664779823812, rating: 664 },
    { title: "Post №4", date: 1664779803812, rating: 682 },
    { title: "Post №5", date: 1664779783812, rating: 417 },
    { title: "Post №6", date: 1664779763812, rating: 318 },
    { title: "Post №7", date: 1664779743812, rating: 627 },
    { title: "Post №8", date: 1664779723812, rating: 424 },
    { title: "Post №9", date: 1664779703812, rating: 322 },
    { title: "Post №10", date: 1664779683812, rating: 436 },
    { title: "Post №11", date: 1664779663812, rating: 315 },
    { title: "Post №12", date: 1664779643812, rating: 427 },
    { title: "Post №13", date: 1664779623812, rating: 325 },
    { title: "Post №14", date: 1664779603812, rating: 227 },
    { title: "Post №15", date: 1664779583812, rating: 437 },
    { title: "Post №16", date: 1664779563812, rating: 657 },
    { title: "Post №17", date: 1664779543812, rating: 270 },
    { title: "Post №18", date: 1664779523812, rating: 337 },
    { title: "Post №19", date: 1664779503812, rating: 396 },
  ]);
  const bestFeed = computed(() =>
    [...state.value].sort((a, b) => b.rating - a.rating)
  );

  const newFeed = computed(() =>
    [...state.value].sort((a, b) => b.date - a.date)
  );

  return { state, bestFeed, newFeed };
});
