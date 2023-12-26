<template>
  <div
    class="select"
    @click="isOpened = !isOpened"
  >
    <span class="select__title">
      {{ selectTitle }}
      <span class="select__arrow" :class="{ 'select__arrow--rotate': isOpened }">
        <img src="../assets/arrow-down.svg" />
      </span>
    </span>
    <ul @click.prevent.stop class="select__options" :class="{ 'select__options--show': isOpened }">
      <li
        v-for="option in options"
        :key="option.key"
        class="select__option"
        :class="{ 'select__option--selected': selectedKeys.includes(option.key) }"
        @click="handleSelect(option.key)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ActiveFiltersOption } from '../App.vue';

@Options({
  props: {
    options: {
      type: Array,
      required: true
    },
    selectedKeys: {
      type: Array,
      required: true
    }
  },
  emits: [
    'select',
  ],
  data() {
    return {
      isOpened: false
    }
  },
  computed: {
    selectTitle(): string {
      return this.options
      .filter((option: ActiveFiltersOption) => this.selectedKeys.includes(option.key))
      .map((option: ActiveFiltersOption)  => option.name).join(', ')
      || 'Please, select filters'
    }
  },
  methods: {
    handleSelect(key: string): void {
      this.$emit('select', key)
    }
  }
})
export default class BaseSelect extends Vue {
  options!: Array<ActiveFiltersOption>
  selectedKeys!: Array<string>
  selectTitle!: string
  isOpened!: boolean
  handleSelect!: ((key: string) => void)
}
</script>

<style lang="scss" scoped>
.select {
  border: 1px solid #A9A9A9;
  box-sizing: border-box;
  padding: 12px 8px;
  position: relative;
  width: 100%;
  max-width: 420px;
  cursor: pointer;
  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &__arrow {
    line-height: 0;
    &--rotate {
      transform: rotate(180deg);
    }
  }
  &__options {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: -1px;
    width: calc(100% + 2px);
    background-color: #FFFFFF;
    border: 1px solid #A9A9A9;
    display: none;
    &--show {
      display: inline-block;
    }
  }
  &__option {
    cursor: pointer;
    border-bottom: 1px solid #A9A9A9;
    padding: 12px 8px;
    &:last-child {
      border: 0;
    }
    &--selected {
      background-color: #F4EEEE;
    }
  }
}
</style>
