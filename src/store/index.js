import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [], // 分类列表
    // serverhost: 'https://api.kromiose.top:9090', // 生产环境（目前）
    serverhost: 'https://api.cerfai.com', // 生产环境（日志完成后迁移）
    // serverhost: 'https://dev.kromiose.top', // 开发测试环境
    // serverhost: 'http://127.0.0.1:5000', // 本地

    token: '',
    // token: '9a58459a6ec807b112933c8c676e295e',
    platform: 'pc' // 平台('pc' / 'pe') App页面加载时会自动设置
  },
  getters: {},
  mutations: {
    setCategories (state, categoriesList) {
      const sortedCategories = { l1: [], l2: {} }
      categoriesList.forEach((element) => {
        if (element.level === 1) {
          element.id = parseInt(parseInt(element.id) / 100)
          sortedCategories.l1.push(element)
        } else {
          element.id = parseInt(element.id)
          const parentId = parseInt(element.id / 100)

          if (sortedCategories.l2[parentId] === undefined) { sortedCategories.l2[parentId] = [] }
          sortedCategories.l2[parentId].push(element)
        }
      })
      state.categories = sortedCategories
    },
    setToken (state, token) {
      state.token = token
    },
    setPlatform (state, platform) {
      state.platform = platform
    }
  },
  actions: {},
  modules: {}
})
