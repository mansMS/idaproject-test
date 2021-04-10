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
  addToBasket(state, product) {
    const index = state.basket.findIndex(({ id }) => id === product.id)
    if (index === -1) {
      state.basket.push(product)
    } else {
      state.basket.splice(index, 0, product)
    }
    localStorage.basket = JSON.stringify(state.basket)
  },
  removeFromBasket(state, id) {
    const index = state.basket.findIndex(product => product.id === id)
    state.basket.splice(index, 1)
    localStorage.basket = JSON.stringify(state.basket)
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
  basketIds: ({ basket }) => {
    return basket.map(({ id }) => id)
  }
}
