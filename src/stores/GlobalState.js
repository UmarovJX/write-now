import { createGlobalState, useStorage } from "@vueuse/core";

export const useGlobalState = createGlobalState(() =>
  useStorage(
    "vueuse-local-storage",
    {
      queryLimit: 5,
      commentLimit: 20,
      user: null,
      apiPath: "http://127.0.0.1:3000/api",
    },
    localStorage,
    { mergeDefaults: true }
  )
);
