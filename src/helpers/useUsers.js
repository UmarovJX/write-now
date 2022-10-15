import { ref } from "vue";
import { useGlobalState } from "../stores/GlobalState";

const globalState = useGlobalState();
export const useUsers = () => {
  const user = ref(null);
  const getUser = async (id) => {
    user.value = null;
    const queryString = globalState.value.apiPath + `/users/${id}`;
    try {
      const response = await fetch(queryString, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      user.value = data.user;
      if (!data.isAuthenticated) globalState.value.user = null;
    } catch (error) {
      console.log(error);
    }
  };

  return { user, getUser };
};
