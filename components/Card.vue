<template>
  <div :class="$style.product">
    <div v-if="'rating' in product" :class="[$style.product__rating, common.rating]">
      <span :class="[$style.rating__star, common.star]">
        <span :class="common.star__fill" :style="`height: ${product.rating*9.4+25}%`" />
      </span>
      <span :class="common.rating__value">{{ product.rating }}</span>
    </div>
    <img
      :src="`${$axios.defaults.baseURL + product.photo}`"
      :alt="product.name"
      :class="$style.product__image">
    <button :class="[common.basketButton, $style.product__basket, product.inBasket && $style.product__basket_active]" @click="addProduct(product.id)">
      <!-- <span v-if="basket.length" :class="common.basketButton__label" /> -->
    </button>
    <div :class="$style.product__text">
      <div :class="$style.product__name">{{ product.name }}</div>
      <div :class="$style.product__price">{{ priceFormatter(product.price) }}</div>
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
    common() {
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

<style lang="scss" module>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 14.5rem;
  height: 15rem;
  padding: 1rem;
  background-color: #fff;
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
