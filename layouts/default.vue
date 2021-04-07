<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: "PT Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("@/assets/fonts/PTSans-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "PT Sans";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("@/assets/fonts/PTSans-Bold.ttf") format("truetype");
}

html {
  font-family: "PT Sans", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

*,
*::before,
*::after {
  margin: 0;
}

a,
button,
select,
select > option,
.pointer {
  cursor: url("@/assets/images/cursor.svg") 10 5, auto;
}

.button-main {
  width: 100%;
  padding: 0.875rem;
  font-family: "PT Sans";
  color: #fff;
  background-color: #1f1f1f;
  border-radius: 8px;
  outline: none;
}

.basket-buttun {
  height: 2rem;
  width: 2rem;
  border: none;
  background: center / contain no-repeat url("@/assets/images/basket.svg"), #fff;
  outline: none;
}

.basket-buttun:hover {
  background-image: url("@/assets/images/basket-hover.svg");
}

.basket-buttun__label {
  position: absolute;
  top: -0.05rem;
  right: -0.05rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.75rem;
  min-width: 0.75rem;
  border-radius: 50%;
  font-size: 0.5rem;
  color: #ffffff;
  background-color: #959dad;
}

.button-close {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: center / auto no-repeat url("@/assets/images/close.svg");
  outline: none;
}

.button-delete {
  width: 2rem;
  height: 2rem;
  border: none;
  background: center / auto no-repeat url("@/assets/images/can.svg");
  outline: none;
}

.rating {
  display: flex;
  align-items: center;
}

.rating__value {
  font-size: 0.625rem;
  line-height: 1.3;
  font-weight: bold;
  color: #f2c94c;
}

.star {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  background-image: url("@/assets/images/star.svg");
  background-repeat: no-repeat;
  background-position: center;
}

.star__fill {
  display: inline-block;
  width: 100%;
  height: 60%;
  background-image: url("@/assets/images/fill.svg");
  background-repeat: no-repeat;
  background-position: bottom;
}
</style>
