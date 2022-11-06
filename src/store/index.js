import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    serverhost: 'https://api.kromiose.top:9090',
    // serverhost: 'http://dev.kromiose.top', // 开发测试环境
    // serverhost: "http://127.0.0.1:9091",
    // serverhost: 'http://tmp.kromiose.top:3090',

    token: "",
    // 本地开发用
    // serverhost: 'http://127.0.0.1:5000',
    // token: '9a58459a6ec807b112933c8c676e295e'
    platform: 'pc', // 平台('pc' / 'pe') App页面加载时会自动设置
  },
  getters: {},
  mutations: {
    setCategories(state, categoriesList) {
      let sortedCategories = { l1: [], l2: {} };
      categoriesList.forEach((element) => {
        if (element.level === 1) {
          element.id = parseInt(parseInt(element.id) / 100);
          sortedCategories.l1.push(element);
        } else {
          element.id = parseInt(element.id);
          let parentId = parseInt(element.id / 100);

          if (sortedCategories.l2[parentId] === undefined)
            sortedCategories.l2[parentId] = [];
          sortedCategories.l2[parentId].push(element);
        }
      });
      state.categories = sortedCategories;
    },
    setToken(state, token) {
      state.token = token;
    },
    setPlatform(state, platform) {
      state.platform = platform;
    }
  },
  actions: {},
  modules: {},
});
