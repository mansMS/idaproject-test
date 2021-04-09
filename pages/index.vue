<template>
  <div :class="$style.page">
    <header :class="$style.header">
      <div :class="$style.header_container">
        <h1 :class="$style.hader__title">TestList</h1>
        <button :class="[common.basketButton, $style.basketButton]" @click="showBasket = true">
          <span v-if="basket.length" :class="common.basketButton__label">{{ basket.length }}</span>
        </button>
      </div>
    </header>
    <main :class="$style.catalog">
      <h2 :class="$style.pageTitle">Каталог</h2>
      <div :class="$style.sortingBlock">
        <label for="sorting_select" :class="$style.sortingItem">
          Сортировать по:
          <Select v-model="activeSorting" :options="sortingList" />
        </label>
      </div>
      <Nav :catalog="catalog" />
      <NuxtChild :sorting="activeSorting.key" />
    </main>
    <Basket v-show="showBasket" @close="showBasket = false" />
    <client-only>
      <BasketChecker />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from '../assets/css/main.scss?module'

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
    ...mapState(['catalog', 'products', 'basket']),
    common() {
      return common
    }
  }
}
</script>

<style lang="scss" module>
.page {
  max-height: 100vh;
  margin: 0 auto;
  overflow: auto;
}

.header {
  color: #59606d;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;

  &_container{
    max-width: 82.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.125rem;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 82.5rem) {
      max-width: 65.375rem;
    }

    @media (max-width: 65.375rem) {
      max-width: 48.25rem;
    }
  }

  &__title {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }
}

.catalog {
  max-width: 82.5rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-row-gap: 1.5em;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 82.5rem) {
    max-width: 65.375rem;
  }

  @media (max-width: 65.375rem) {
    max-width: 48.25rem;
  }

  @media (max-width: 48.25rem) {
    max-width: 33.625rem;
    grid-template-columns: 1fr;
  }

  @media (max-width: 33.625rem) {
    max-width: 20.5rem;
  }
}

.pageTitle {
  font-size: 2rem;
  line-height: 1.25;
}

.basketButton {
  position: relative;
}

.sortingBlock {
  display: flex;
  justify-content: flex-end;

  @media (max-width: 48.25rem) {
    justify-content: flex-start;
  }
}

.sortingItem {
  display: flex;
}
</style>
