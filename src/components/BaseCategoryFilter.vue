<template>
  <div class="tree-select" @click="isOpened = !isOpened">
    <span class="tree-select__title">
      {{ selectTitle }}
      <span class="tree-select__arrow" :class="{ 'tree-select__arrow--rotate': isOpened }">
        <img src="../assets/arrow-down.svg" />
      </span>
    </span>
    <ul
      class="tree-select__tree"
      :class="{
        'tree-select__tree--hide': !isOpened
      }"
      @click.stop
    >
      <BaseCategoryFilterItem
        class="tree-select__option"
        @mouseenter="hoveredCategory = category.name"
        :showChildrens="hoveredCategory === category.name"
        :depth="1"
        v-for="category in tree"
        :key="category.name"
        :category="category"
        :checkedCategories="checkedCategories"
        @select="handleSelect"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Category } from '../App.vue';
import BaseCategoryFilterItem from './BaseCategoryFilterItem.vue'

@Options({
  components: {
    BaseCategoryFilterItem
  },
  props: {
    tree: {
      type: Array,
      required: true
    },
    checkedCategories: {
      type: Array,
      required: true
    }
  },
  emits: [
    'changeCheckedCategories',
  ],
  watch: {
    isOpened(value: boolean) {
      if (!value) {
        this.hoveredCategory = ''
      }
    }
  },
  data() {
    return {
      isOpened: false,
      hoveredCategory: ''
    }
  },
  computed: {
    selectTitle(): string {
      return 'Please, select category'
    }
  },
  methods: {
    handleSelect(category: Category): void {
      const isSelected = (this.checkedCategories as string[]).find(checked => {
        return checked === category.name
      })
      let checkedCategories = this.checkedCategories

      if (isSelected) {
        checkedCategories = (this.checkedCategories as string[]).filter(checked => {
          return checked !== category.name
        })
      } else {
        checkedCategories.push(category.name)
      }

      this.$emit('changeCheckedCategories', checkedCategories)
    }
  }
})
export default class BaseCategoryFilter extends Vue {
  tree!: Array<Category>
  checkedCategories!: Array<string>
  selectTitle!: string
  isOpened!: boolean
  hoveredCategory!: string
  handleSelect!: ((name: string) => void)
}
</script>

<style lang="scss">
.tree-select {
  border: 1px solid #A9A9A9;
  box-sizing: border-box;
  padding: 12px 8px;
  position: relative;
  width: 100%;
  max-width: 200px;
  width: 200px;
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
  &__arrow-left {
    line-height: 0;
    transform: rotate(270deg);
    margin-left: auto;
  }
  &__tree {
    position: absolute;
    z-index: 1;
    top: calc(100% + 1px);
    left: -1px;
    width: 200px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    border: 1px solid #A9A9A9;
    &--hide {
      display: none;
    }
    &--depth {
      left: 200px;
      top: 0;
    }
  }
  &__option {
    position: relative;
    border-bottom: 1px solid #A9A9A9;
    cursor: pointer;
    padding: 12px 0;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &--selected {
      background-color: #F4EEEE;
    }
    &:last-child {
      border: 0;
    }
  }
}
</style>
