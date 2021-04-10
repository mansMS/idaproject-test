<template>
  <transition name="modal">
    <div :class="s.modalMask">
      <div :class="s.basket">
        <button :class="[c.buttonClose, s.basket__close]" @click="$emit('close')" />
        <h2 :class="s.basket__title">Корзина</h2>
        <div v-if="!products || !products.length" :class="s.empty">
          <p :class="s.empty__text">Пока что вы ничего не добавили в корзину.</p>
          <button :class="c.buttonMain" @click="$emit('close')">Перейти к выбору</button>
        </div>
        <div v-else>
          <div :class="s.products">
            <p :class="s.products__title">Товары в корзине</p>
            <div v-for="(product, index) in products" :key="product.id+index" :class="s.product">
              <img
                :src="`${$axios.defaults.baseURL + product.photo}`"
                :alt="product.name"
                :class="s.product__image">
              <div :class="s.product__description">
                <div>
                  <div :class="s.product__name">{{ product.name }}</div>
                  <div :class="s.product__price">{{ priceFormatter(product.price) }}</div>
                </div>
                <Raiting v-if="'rating' in product" :class="s.product__rating" :rating="product.rating" />
              </div>
              <button :class="[c.buttonDelete, s.product__delete]" @click="removeProduct(product.id)" />
            </div>
          </div>
          <div :class="s.formBlock">
            <p :class="s.formBlock__title">Оформить заказ</p>
            <form id="app" action="/" method="post" @submit="checkForm">
              <p><input id="name" v-model="name" type="text" name="name" placeholder="Ваше имя"></p>
              <p><input
                id="phone"
                v-model="phone"
                type="text"
                name="phone"
                placeholder="Телефон"></p>
              <p><input id="address" :valuev-model="address" type="text" name="address" placeholder="Адрес"></p>
              <input :class="[c.buttonMain, s.form__button]" type="submit" value="Отправить" :disabled="disableSubmit">
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import common from '../assets/css/main.scss?module'

export default {
  data() {
    return {
      disableSubmit: false,
      name: '',
      phoneValue: '',
      address: ''
    }
  },
  computed: {
    ...mapState({ products: 'basket' }),
    c() {
      return common
    },
    phone: {
      get() {
        return this.phoneValue
      },
      set(newVal) {
        this.phoneValue = this.formatPhone(newVal)
      }
    }
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
    },
    checkForm(e) {
      if (this.name && this.phone && this.address) {
        this.errdisableSubmitor = false
        return true
      } else {
        this.disableSubmit = true
        e.preventDefault()
      }
    },
    formatPhone(e) {
      const key = e.key
      console.log('e', e)
      console.log('key', key)
      // if (!/^\d+/g.test(key)) {
      //   e.preventDefault()
      // }
      return '+7 234 234-__-__'
    }
  }
}
</script>

<style lang="scss" module="s">
@import '@/assets/css/colors';

.modalMask {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: $transparent-white;
}

.basket {
  box-sizing: border-box;
  height: 100%;
  max-width: 30rem;
  margin-left: auto;
  padding: 3.25rem 3rem;
  background-color: $white;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: -0.25rem 0px 1rem rgba(0, 0, 0, 0.05);
  overflow: auto;

  &__close {
    position: relative;
    float: right;
    top: 0.5rem;
  }

  &__title {
    font-size: 2rem;
    line-height: 1.25;
  }
}

.empty__text {
  margin: 1.5rem 0;
  font-size: 1.375rem;
  line-height: 1.75rem;
}

.products {
  padding: 0.5rem 0;

  &__title {
    margin: 1rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
    color: #59606d;
  }
}

.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 1rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  &__image {
    width: 5.625rem;
    max-height: 5.625rem;
  }

  &__description {
    align-self: stretch;
    width: 10.625rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.875rem;
    line-height: 1.125rem;
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

.formBlock {
  &__title {
    margin: 1rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
    color: #59606d;
  }

  input:not([type="submit"]) {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.875rem;
    border: none;
    outline: none;
    color: #1F1F1F;
    background-color: $dark-white;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.3125;
  }
}

.form__button {
  margin: 0.5rem 0;
}

@media (max-width: 28.75rem) {
  .basket {
    padding: 1rem;
  }

  .product {
    padding: 0.4rem;
  }
}
</style>

<style>
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
