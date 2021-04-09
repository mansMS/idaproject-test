<template>
  <div :class="s.product">
    <Raiting v-if="'rating' in product" :class="s.product__rating" :rating="product.rating" />
    <img
      :src="`${$axios.defaults.baseURL + product.photo}`"
      :alt="product.name"
      :class="s.product__image">
    <button :class="[c.basketButton, s.product__basket, product.inBasket && s.product__basket_active]" @click="addProduct(product.id)">
      <!-- <span v-if="basket.length" :class="c.basketButton__label" /> -->
    </button>
    <div :class="s.product__text">
      <div :class="s.product__name">{{ product.name }}</div>
      <div :class="s.product__price">{{ priceFormatter(product.price) }}</div>
    </div>
  </div>
</template>

<script>
import common from '../assets/css/main.scss?module'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    c() {
      return common
    }
  },
  methods: {
    addProduct(id) {
      this.$store.commit('addToBasket', id)
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
@import '@/assets/css/colors';

.product {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 14.5rem;
  height: 15rem;
  padding: 1rem;
  background-color: $white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  &__rating {
    position: absolute;
    left: 1rem;
  }

  &__image {
    max-height: 180px;
    align-self: center;
  }

  &__basket {
    position: absolute;
    right: 1rem;
    height: 1rem;
    width: 1rem;
    opacity: 0.5;

    &_active {
      opacity: 1;
    }
  }

  &__text {
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.3;
  }

  &__name {
    color: #59606d;
    margin-bottom: 0.375rem;
  }

  &__price {
    font-weight: bold;
    color: #1f1f1f;
  }
}
</style>
