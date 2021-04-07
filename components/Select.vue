<template>
  <div :tabindex="tabindex" class="select" @blur="close">
    <div class="select__selected selected" @click="open">
      <span class="selected__text">{{ selected ? selected.text : 'Нет элементов' }}</span>
      <span class="selected__arrow" />
    </div>
    <div v-if="options && options.length" class="select__item-list" :class="{ open: isOpen }">
      <div
        v-for="option of options"
        :key="option.key"
        class="select__item"
        @click="select(option)"
      >По {{ option.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selected:
        this.options && this.options.length > 0 ? this.options[0] : null,
      isOpen: false
    }
  },
  computed: {
    hasOptions() {
      return this.options && this.options.length > 0
    }
  },
  mounted() {
    if (this.selected) {
      this.$emit('input', this.selected)
    }
  },
  methods: {
    open() {
      if (this.hasOptions) {
        this.isOpen = !this.isOpen
      }
    },
    close() {
      this.isOpen = false
    },
    select(option) {
      this.selected = option
      this.isOpen = false
      this.$emit('input', option)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  outline: none;

  &__selected {
    width: 8rem;
    padding: 0 0.8125rem 0 0.375rem;
    color: #59606d;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-list {
    color: #959dad;
    border-radius: 0.5rem;
    background-color: #ffffff;
    box-shadow: 0px 0.25rem 1rem rgba(0, 0, 0, 0.05);
    padding: 0.5rem 0;
    position: absolute;
    top: 1.6875rem;
    right: 0;
    z-index: 1;
    display: none;
  }

  &__item {
    width: 10rem;
    padding: 0.4rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.125rem;
    word-wrap: break-word;
    cursor: url("@/assets/images/cursor.svg") 10 5, auto;

    &:hover {
      color: #1f1f1f;
      background-color: #f8f8f8;
    }
  }
}

.selected {
  cursor: url("@/assets/images/cursor.svg") 10 5, auto;

  &__arrow {
    display: inline-block;
    width: 0.3125rem;
    height: 0.5rem;
    background-image: url("@/assets/images/select-arror.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}

.open {
  display: block;
}
</style>
