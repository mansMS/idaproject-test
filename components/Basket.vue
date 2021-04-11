<template>
  <transition name="modal">
    <div :class="s.modalMask">
      <div :class="s.basket">
        <header :class="s.basket__header">
          <h2 :class="s.basket__title">Корзина</h2>
          <button :class="c.buttonClose" @click="close" />
        </header>
        <div v-if="formSubmitted" :class="s.submitted">
          <img
            src="@/assets/images/ok.svg"
            :alt="'ok'">
          <p :class="s.submitted__text">Заявка успешно отправлена</p>
          <p :class="s.submitted__subText">Вскоре наш менеджер свяжется с Вами</p>
        </div>
        <div v-else-if="!products || !products.length" :class="s.empty">
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
            <form id="app" @submit.prevent="onSubmit" @input="formDisabled = false">
              <p><input id="name" v-model="name" type="text" name="name" placeholder="Ваше имя"></p>
              <p><input
                id="phone"
                ref="phone"
                v-model="phone"
                type="text"
                name="phone"
                placeholder="Телефон"></p>
              <p><input id="address" v-model="address" type="text" name="address" placeholder="Адрес"></p>
              <input :class="[c.buttonMain, s.form__button]" type="submit" value="Отправить" :disabled="formDisabled">
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
      name: '',
      phoneValue: '',
      address: '',
      errors: { name: false, phone: false, address: false, form: false },
      formDisabled: false,
      formSubmitted: false
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
        const clearPhone = newVal.replace(/\D/g, '').slice(newVal.startsWith('+7') ? 1 : 0, 11)
        const formattedPhone = this.formatPhone(clearPhone)
        this.phoneValue = ''
        this.phoneValue = formattedPhone
        const index = formattedPhone.indexOf('_')
        this.$nextTick(() => { this.$refs.phone.setSelectionRange(index, index) })
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
    formatPhone(p) {
      return `+7 ${p[0] || '_'}${p[1] || '_'}${p[2] || '_'} ${p[3] || '_'}${p[4] || '_'}${p[5] || '_'}-${p[6] || '_'}${p[7] || '_'}-${p[8] || '_'}${p[9] || '_'}`
    },
    async onSubmit(e) {
      this.errors.name = !this.name
      this.errors.phone = this.phone.length < 16
      this.errors.address = !this.address
      if (this.errors.name || this.errors.phone || this.errors.address) {
        e.preventDefault()
        this.formDisabled = true
        return false
      } else {
        try {
          await fetch('https://jsonplaceholder.typicode.com/todos/1') // просто заглушка для await
          this.formSubmitted = true
          this.$store.commit('setBasket', [])
        } catch {
          this.errors.form = true
        }
      }
    },
    clear() {
      this.name = ''
      this.phoneValue = ''
      this.address = ''
      this.formSubmitted = false
    },
    close() {
      if (this.formSubmitted) {
        this.clear()
      }
      this.$emit('close')
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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  max-width: 30rem;
  margin-left: auto;
  padding: 3.25rem 3rem;
  background-color: $white;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: -0.25rem 0 1rem rgba(0, 0, 0, 0.05);
  overflow: auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    color: $grey;
  }
}

.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;

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
    color: $grey;
    margin-bottom: 0.375rem;
  }

  &__price {
    font-weight: bold;
    color: $black;
  }
}

.formBlock {
  &__title {
    margin: 1rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
    color: $grey;
  }

  input:not([type="submit"]) {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.875rem;
    border: none;
    outline: none;
    color: $black;
    background-color: $dark-white;
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 1.3125;
  }
}

.form__button {
  margin: 0.5rem 0;
}

.submitted {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 2.5rem;

  &__text {
    margin: 1.5rem 0 0.125rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: bold;
  }

  &__subText {
    line-height: 1.3125;
    color: $grey;
  }
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
