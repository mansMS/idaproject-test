<template>
  <div>
    <p v-if="!sortingProducts || !sortingProducts.length" :class="s.productsEmpty">Пусто. Поменяйте категорию или фильтры</p>
    <div v-else :class="s.productList">
      <Card
        v-for="product in sortingProducts"
        :key="product.id"
        :product="product"
        @click="fetchProducts" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    ...mapGetters(['basketIds']),
    sortingProducts() {
      const products =
        this.$store.state.products[this.$store.state.activeCatalog] || []
      return [...products]
        .sort((a, b) => a[this.sorting] - b[this.sorting])
        .map(product => ({
          ...product,
          inBasket: this.basketIds.includes(product.id)
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

<style lang="scss" module="s">
.productsEmpty {
  text-align: center;
}

.productList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  @media (max-width: 82.5rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 65.375rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 33.625rem) {
    grid-template-columns: 1fr;
  }
}
</style>
