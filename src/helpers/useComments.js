import { ref } from "vue";
import { useGlobalState } from "../stores/GlobalState";

const globalState = useGlobalState();
export const useComments = () => {
  const comments = ref([]);
  const commentsNumber = ref(0);
  const commentsLoading = ref(false);
  const getComments = async ({
    parentType,
    refers,
    limit = globalState.value.commentLimit,
    page = 1,
  }) => {
    commentsLoading.value = true;
    const queryString =
      globalState.value.apiPath +
      "/comments?" +
      `parentType=${parentType}&limit=${limit}&page=${page}&refers=${refers}`;
    try {
      const response = await fetch(queryString, { credentials: "include" });
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      comments.value = [...comments.value, ...data.comments];
      commentsNumber.value = data.num;
      commentsLoading.value = false;
    } catch (error) {
      console.log(error);
      getComments({ parentType, limit, page, refers });
    }
  };

  return { comments, commentsNumber, getComments, commentsLoading };
};
