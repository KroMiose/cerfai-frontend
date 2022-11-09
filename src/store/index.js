import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: {l1:[],l2:[]}, // 分类列表
    // serverhost: 'https://api.kromiose.top:9090', // 生产环境（目前）
    // serverhost: 'https://api.cerfai.com', // 生产环境（日志完成后迁移）
    serverhost: 'https://dev.kromiose.top', // 开发测试环境
    // serverhost: 'http://127.0.0.1:5000', // 本地

    token: '',
    // token: '9a58459a6ec807b112933c8c676e295e',
    platform: 'pc', // 平台('pc' / 'pe') App页面加载时会自动设置
    searchHis: (() => { try { return JSON.parse(localStorage.searchHis || "[]") } catch (ignore) { } finally { return [] } })(),
    toSetFormData:{}
  },
  getters: {},
  mutations: {
    setCategories(state, categoriesList) {
      let sortedCategories = { l1: [], l2: {} };
      categoriesList.forEach((element) => {
        if (element.level == 1) {
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
    storeFormRow(state,row){
      state.toSetFormData=row;
    },
    appendHistory(state, history) {
      for (let i = 0; i < state.searchHis.length; i++) {
        if (state.searchHis[i].w == history) {
          for (let j = i - 1; j >= 0; j--) {
            state.searchHis[j + 1] = state.searchHis[j];
            state.searchHis[j + 1].i--;
          }
          state.searchHis.shift();
          break;
        }
      }
      state.searchHis.unshift({
        w: history,
        i: state.searchHis.length,
      });
      localStorage.searchHis = JSON.stringify(this.searchHis);
    },
  },
  actions: {},
  modules: {},
});
