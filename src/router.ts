import { createWebHashHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'vulnerabilityQuery'
  },
  {
    path: "/vulnerabilityQuery",
    name: "vulnerabilityQuery",
    component: () => import("@/views/VulnerabilityQuery/index.vue"),
  },
  {
    path: "/vulnerabilityDetail",
    name: "vulnerabilityDetail",
    component: () => import("@/views/VulnerabilityQuery/detail.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
