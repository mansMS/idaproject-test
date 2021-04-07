<template>
  <div class="product">
    <div v-if="'rating' in product" class="product__rating rating">
      <span class="rating__star star">
        <span class="star__fill" :style="`height: ${product.rating*10+10}%`" />
      </span>
      <span class="rating__value">{{ product.rating }}</span>
    </div>
    <img
      :src="`${$axios.defaults.baseURL + product.photo}`"
      :alt="product.name"
      class="product__image"
    />
    <button class="basket-buttun product__basket" @click="addProduct(product.id)">
      <!-- <span v-if="basket.length" class="basket-buttun__label" /> -->
    </button>
    <div class="product__text">
      <div class="product__name">{{ product.name }}</div>
      <div class="product__price">{{ priceFormatter(product.price) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
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

<style lang="scss" scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 14.5rem;
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
