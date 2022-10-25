import { createGlobalState, useStorage } from "@vueuse/core";

export const useGlobalState = createGlobalState(() =>
  useStorage(
    "vueuse-local-storage",
    {
      queryLimit: 5,
      commentLimit: 20,
      user: null,
      apiPath: "http://31.42.56.11:3000/api",
    },
    localStorage,
    { mergeDefaults: true }
  )
);
