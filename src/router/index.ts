// Import Core
import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// Components
import HomeView from "@/views/ViewHome.vue";

// Data
const defaultTitle = "Demetory™ — Design the Planet";
const isAuthenticated = false;

// Routes
const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    // Generates a separate chunk for this route which is lazy-loaded when the route is visited
    component: () => import("@/views/ViewNotFound.vue"),
    meta: {
      title: "Page not Found",
    },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

// Create Router
const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      return { top: 0 };
    }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guards
router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title ? defaultTitle + " | " + to.meta.title : defaultTitle;
  });
});

router.beforeEach((to) => {
  if (to.name !== "login" && to.meta.auth && !isAuthenticated) {
    return { name: "login" };
  }
});

// Export
export default router;
