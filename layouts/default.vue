<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
@import '../assets/css/colors.scss';

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
input[type="submit"] {
  cursor: url("@/assets/images/cursor.svg") 10 5, auto;
}

input {
  box-sizing: border-box;
}

a.nuxtLinkActive,
a.nuxtLinkActive:hover {
  text-decoration-line: underline;
  color: $black;
}

.modal-enter,
.modal-leave-to {
  right: -100%;
}

.modal-enter-active {
  transition: all 3s cubic-bezier(0, 1, 1, 1);
}

.modal-leave-active {
  transition: all 2s cubic-bezier(0, 0, 1, 0);
}
</style>
