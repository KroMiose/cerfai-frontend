import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import contribution from "../views/contribution.vue";
import selectTags from "../views/selectTags.vue";
import List from "../views/List.vue";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    children: [
      {
        path: "/contribution",
        name: "contribution",
        component: contribution,
      },
      {
        path: "/selectTags",
        name: "selectTags",
        component: selectTags,
      },
      {
        path: "/List",
        name: "List",
        component: List,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
