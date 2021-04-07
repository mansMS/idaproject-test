<template>
  <div class="product-list">
    <Card
      v-for="product in sortingProducts"
      :key="product.id"
      :product="product"
      @click="fetchProducts"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  beforeRouteUpdate(to, from, next) {
    next()
    this.$store.commit('setActiveCatalog', this.$route.params.id)
    if (!this.$store.state.products[this.$route.params.id]) {
      this.fetchProducts()
    }
  },
  props: {
    sorting: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['basket']),
    sortingProducts() {
      const products =
        this.$store.state.products[this.$store.state.activeCatalog] || []
      return [...products]
        .sort((a, b) => a[this.sorting] - b[this.sorting])
        .map(product => ({
          ...product,
          inBasket: this.basket.includes(product.id)
        }))
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const { data: products } = await this.$axios.get('api/product', {
          params: {
            category: this.$route.params.id
          }
        })
        this.$store.commit('setProducts', {
          [this.$route.params.id]: products
        })
      } catch {
        this.$store.commit('setProducts', { [this.$route.params.id]: [] })
      }
    },
    priceFormatter(value) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  @media (max-width: 85rem) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
