<template>
  <div :tabindex="tabindex" :class="s.select" @blur="close">
    <div :class="[s.select__selected, s.selected, c.pointer]" @click="open">
      <span :class="s.selected__text">{{ selected ? selected.text : 'Нет элементов' }}</span>
      <span :class="s.selected__arrow" />
    </div>
    <div v-if="options && options.length" :class="[s.select__itemList, isOpen && s.open]">
      <div
        v-for="option of options"
        :key="option.key"
        :class="[s.select__item, c.pointer]"
        @click="select(option)">По {{ option.text }}</div>
    </div>
  </div>
</template>

<script>
import common from '../assets/css/main.scss?module'

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
    },
    c() {
      return common
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

<style lang="scss" module="s">
@import '@/assets/css/colors';

.select {
  position: relative;
  outline: none;

  &__selected {
    width: 8rem;
    padding-left: 0.375rem;
    color: #59606d;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__itemList {
    color: #959dad;
    border-radius: 0.5rem;
    background-color: $white;
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

    &:hover {
      color: #1f1f1f;
      background-color: $dark-white;
    }
  }
}

.selected {
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
