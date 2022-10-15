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
      globalState.value.apiPath +
      "/posts?" +
      `feedType=${feedType}&limit=${query.limit}&page=${query.page}` +
      (feedType === "user" ? `&userId=${query.userId}` : "");

    const resp = await fetch(queryString, { credentials: "include" }).then(
      (res) => res.json()
    );
    posts.value = resp.posts;
    num.value = Math.ceil(resp.num / globalState.value.queryLimit);
  };

  const post = ref(null);
  const getPost = async (id) => {
    post.value = null;
    const queryString = globalState.value.apiPath + `/posts/${id}`;

    try {
      const response = await fetch(queryString, { credentials: "include" });
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      post.value = data.post;
      if (!data.isAuthenticated) globalState.value.user = null;
    } catch (error) {
      console.log(error);
    }
  };

  return { posts, num, post, getPost, getPosts };
};
