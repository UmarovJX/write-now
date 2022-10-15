import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

import { useGlobalState } from "../stores/GlobalState";
const globalState = useGlobalState();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: {
        name: "feed",
        params: { feedType: "best" },
      },
    },
    {
      path: "/feed/:feedType",
      name: "feed",
      component: HomeView,
      props: true,
      beforeEnter: [
        (to) => {
          if (!to.query.limit) to.query.limit = globalState.value.queryLimit;
          if (!to.query.page) to.query.page = 1;
          return ["best", "new", "subs"].includes(to.params.feedType)
            ? true
            : "/feed/best";
        },
      ],
    },
    {
      path: "/auth",
      children: [
        { path: "/register", component: RegisterView, name: "register" },
        { path: "/login", component: LoginView, name: "login" },
      ],
    },
    {
      path: "/post/:id",
      name: "post",
      props: true,

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PostView.vue"),
    },
    {
      path: "/settings",
      name: "settings",

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SettingsView.vue"),
    },
    {
      path: "/user/:id",
      name: "user",
      props: (route) => ({ id: +route.params.id }),

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/UserView.vue"),
    },
  ],
});
router.afterEach(() => window.scrollTo(0, 0));

export default router;
