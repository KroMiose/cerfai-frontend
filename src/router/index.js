import Vue from "vue";
import VueRouter from "vue-router";
//pc
import index from "../views/pc/index.vue";
import contribution from "../views/pc/contribution.vue";
import selectTags from "../views/pc/selectTags.vue";
import List from "../views/pc/List.vue";
//pe
import index_pe from "../views/pe/index.vue";
import contribution_pe from "../views/pe/contribution.vue";
import selectTags_pe from "../views/pe/selectTags.vue";
import List_pe from "../views/pe/List.vue";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  //pc
  {
    path: "/index",
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
  //pe
  {
    path: "/index_pe",
    name: "index_pe",
    component: index_pe,
    children: [
      {
        path: "/contribution_pe",
        name: "contribution_pe",
        component: contribution_pe,
      },
      {
        path: "/selectTags_pe",
        name: "selectTags_pe",
        component: selectTags_pe,
      },
      {
        path: "/List_pe",
        name: "List_pe",
        component: List_pe,
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: /* adminPanel */ () => import(/* webpackChunkName: "adminPanel" */ '@/views/pc/adminPanel.vue')
  },
];

const router = new VueRouter({
  routes,
});

export default router;
