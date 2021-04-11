<template>
  <nav :class="s.catalogNav">
    <li v-for="catalogUnit in catalog" :key="catalogUnit.id" :class="s.catalogNav__item">
      <NuxtLink :to="`/${catalogUnit.id}`" :class="s.catalogNav__link">{{ catalogUnit.name }}</NuxtLink>
    </li>
  </nav>
</template>

<script>
export default {
  props: {
    catalog: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" module="s">
@import '@/assets/css/colors';

.catalogNav {
  list-style: none;

  &__item {
    margin-bottom: 1rem;
  }

  &__link {
    text-decoration: none;
    outline: none;
    line-height: 1.3rem;
    color: $bright-grey;

    &:hover,
    &:focus {
      color: $grey;
    }
  }
}

.nuxtLinkActive {
  text-decoration-line: underline;
  color: $black;
}
</style>
