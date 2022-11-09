import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    serverhost: "http://dev.kromiose.top",
    // serverhost: 'http://127.0.0.1:3090',
    searchHis: (() => { try { return JSON.parse(localStorage.searchHis || "[]") } catch (ignore) { } finally { return [] } })(),
    token: "",
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
