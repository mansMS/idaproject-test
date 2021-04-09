<template>
  <div :class="s.rating">
    <span :class="s.star">
      <span :class="s.star__fill" :style="`height: ${rating*9.4+25}%`" />
    </span>
    <span :class="s.rating__value">{{ rating }}</span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" module="s">
@import '@/assets/css/colors';

.rating {
  display: flex;
  align-items: center;

  &__value {
    font-size: 0.625rem;
    line-height: 1.3;
    font-weight: bold;
    color: $yellow;
  }
}

.star {
  display: flex;
  align-items: flex-end;
  width: 20px;
  height: 20px;
  text-align: center;
  background-image: url("@/assets/images/star.svg");
  background-repeat: no-repeat;
  background-position: center;

  &__fill {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/fill.svg");
    background-repeat: no-repeat;
    background-position: bottom;
  }
}
</style>
