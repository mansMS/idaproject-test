<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="basket">
        <button class="button-close basket__close" @click="$emit('close')" />
        <h2 class="basket__title">Корзина</h2>
        <div v-if="!products || !products.length" class="empty">
          <p class="empty__text">Пока что вы ничего не добавили в корзину.</p>
          <button class="button-main" @click="$emit('close')">Перейти к выбору</button>
        </div>
        <div v-else class="products">
          <p class="products__title">Товары в корзине</p>
          <div v-for="(product, index) in products" :key="product.id+index" class="product">
            <img
              :src="`${$axios.defaults.baseURL + product.photo}`"
              :alt="product.name"
              class="product__image"
            />
            <div class="product__description">
              <div>
                <div class="product__name">{{ product.name }}</div>
                <div class="product__price">{{ priceFormatter(product.price) }}</div>
              </div>
              <div class="product__rating rating">
                <span class="rating__star star">
                  <span class="star__fill" :style="`height: ${product.rating*10+10}%`" />
                </span>
              </div>
            </div>
            <button class="button-delete product__delete" @click="removeProduct(product.id)" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'busketProducts'
    })
  },
  methods: {
    removeProduct(id) {
      this.$store.commit('removeFromBasket', id)
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
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.basket {
  box-sizing: border-box;
  height: 100%;
  width: 28.75rem;
  margin-left: auto;
  padding: 3.25rem 3rem;
  background-color: #fff;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: -0.25rem 0px 1rem rgba(0, 0, 0, 0.05);
}

.basket__close {
  position: relative;
  float: right;
  top: 0.5rem;
}

.basket__title {
  font-size: 2rem;
  line-height: 1.25;
}

.empty__text {
  margin: 1.5rem 0;
  font-size: 1.375rem;
  line-height: 1.75rem;
}

.products {
}

.products__title {
  margin: 1.5rem 0 1rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: #59606d;
}

.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 1rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.product__image {
  max-height: 90px;
}

.product__description {
  height: 100%;
  width: 10.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.875rem;
  line-height: 1.125rem;
}

.product__name {
  color: #59606d;
}

.product__price {
  font-weight: bold;
  color: #1f1f1f;
}

.modal-enter,
.modal-leave-to {
  right: -100%;
}

.modal-enter-active {
  transition: all 0.3s cubic-bezier(0, 1, 1, 1);
}

.modal-leave-active {
  transition: all 0.2s cubic-bezier(0, 0, 1, 0);
}
</style>
