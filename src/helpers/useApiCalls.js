import { ref } from "vue";
import { useGlobalState } from "../stores/GlobalState";

const globalState = useGlobalState();
export const usePosts = () => {
  const posts = ref([]);
  const num = ref(0);
  const getPosts = async (feedType, query) => {
    posts.value = [];
    if (!query.limit) query.limit = globalState.value.queryLimit;
    if (!query.page) query.page = 1;
    const queryString =
      globalState.value.apiPath + "/posts?" + `feedType=${feedType}`;
    const resp = await fetch(
      queryString + `&limit=${query.limit}&page=${query.page}`,
      { credentials: "include" }
    ).then((res) => res.json());
    posts.value = resp.posts;
    num.value = resp.num / globalState.value.queryLimit;
  };

  return { posts, getPosts, num };
};
