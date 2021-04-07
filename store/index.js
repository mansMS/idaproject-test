export const state = () => ({
  catalog: [],
  products: {},
  activeCatalog: null,
  basket: []
})

export const mutations = {
  setCatalog(state, catalog) {
    state.catalog = catalog
  },
  setProducts(state, products) {
    state.products = Object.assign(state.products, products)
    state.products = { ...state.products, ...products }
  },
  setActiveCatalog(state, id) {
    state.activeCatalog = id
  },
  setBasket(state, basket) {
    state.basket = basket
  },
  addToBasket(state, id) {
    const index = state.basket.indexOf(id)
    if (index === -1) {
      state.basket.push(id)
    } else {
      state.basket.splice(state.basket.indexOf(id), 0, id)
    }
    localStorage.busket = JSON.stringify(state.basket)
  },
  removeFromBasket(state, id) {
    state.basket.splice(state.basket.indexOf(id), 1)
    localStorage.busket = JSON.stringify(state.basket)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { $axios, params }) {
    try {
      const { data: catalog } = await $axios.get('api/product-category')
      commit('setCatalog', catalog)
      const { data: products } = await $axios.get('api/product', {
        params: {
          category: params.id
        }
      })
      commit('setProducts', { [params.id]: products })
      commit('setActiveCatalog', params.id)
    } catch {
      commit('setProducts', { [params.id]: [] })
    }
  }
}

export const getters = {
  busketProducts: (state) => {
    return state.basket.map(id => state.products[state.activeCatalog].find(product => product.id === id)).filter(Boolean)
  }
}
