<template>
  <span />
</template>

<script>
export default {
  mounted() {
    if (localStorage.basket) {
      this.$store.commit('setBasket', JSON.parse(localStorage.basket))
    }
  }
}
</script>
