<template>
  <div class="catalog">
    <header class="header">
      <h1 class="hader__title">TestList</h1>
      <button class="basket-buttun" @click="showBasket = true">
        <span v-if="basket.length" class="basket-buttun__label">{{ basket.length }}</span>
      </button>
    </header>
    <main class="catalog__content">
      <h2 class="page-title">Каталог</h2>
      <div class="sorting-block">
        <label for="sorting_select" class="sorting-item">
          Сортировать по:
          <Select v-model="activeSorting" :options="sortingList" />
        </label>
      </div>
      <Nav :catalog="catalog" />
      <NuxtChild :sorting="activeSorting.key" />
    </main>
    <Basket v-show="showBasket" @close="showBasket = false" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  asyncData({ store, params, redirect }) {
    if (typeof params.id === 'undefined') {
      redirect({ path: store.state.catalog[0].id.toString() })
    }
  },
  data() {
    return {
      activeCatalog: 0,
      sortingList: [
        { key: 'price', text: 'цене' },
        { key: 'rating', text: 'популярности' }
      ],
      activeSorting: { key: 'price', text: 'цене' },
      showBasket: false
    }
  },
  computed: {
    ...mapState(['catalog', 'products', 'basket'])
  },
  mounted() {
    if (process.browser && localStorage.busket) {
      this.$store.commit('setBasket', JSON.parse(localStorage.busket))
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  max-width: 1440px;
  margin: 0 auto;

  &__content {
    max-width: 79rem;
    display: grid;
    grid-template-columns: 10rem 1fr;
    grid-row-gap: 1.5em;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 85rem) {
      max-width: 61.5rem;
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.125rem;
  margin: 0 auto;
  padding: 1rem 5.5rem;
  color: #59606d;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;

  &__title {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }
}

.page-title {
  font-size: 2rem;
  line-height: 1.25;
}

.basket-buttun {
  position: relative;
}

.sorting-block {
  display: flex;
  justify-content: flex-end;
}

.sorting-item {
  display: flex;
}
</style>
