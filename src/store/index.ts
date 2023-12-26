import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    categoriesTree: [],
    fetching: true,
    isFailure: false
  },
  mutations: {
    setFetching(state) {
      state.fetching = false
      state.isFailure = false
    },
    setFailure(state) {
      state.fetching = false
      state.isFailure = true
    },
    setData(state, payload) {
      state.products = payload.products
      state.categoriesTree = payload.categories
      state.fetching = false
    }
  },
  actions: {
    getData({ commit }) {
      commit('setFetching')
      Promise.all([
        fetch('/api/products')
        .then((response) => response.json())
        .then((json) => json),
        fetch('/api/categories')
        .then((response) => response.json())
        .then((json) => json)
      ])
        .then(([products, categories]) => {
          commit('setData', {
            products, categories
          })
        })
        .catch(() => {
          commit('setFailure')
        })
    }
  }
})
