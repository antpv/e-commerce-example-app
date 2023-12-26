<template>
  <li class="tree-select__option">
    <input
      type="checkbox"
      :checked="checkedCategories.includes(category.name)"
      @input="handleSelect(category)"
    />
    {{ category.name }}
    <span class="tree-select__arrow-left" v-if="category.categories.length">
      <img src="../assets/arrow-down.svg" />
    </span>
    <ul
      class="tree-select__tree"
      :class="{
        'tree-select__tree--depth': depth,
        'tree-select__tree--hide': !showChildrens
      }"
      v-if="category.categories.length"
    >
      <BaseCategoryFilterItem
        v-for="currentCategory in category.categories"
        class="tree-select__option"
        @mouseenter="hoveredCategory = currentCategory.name"
        :showChildrens="hoveredCategory === currentCategory.name"
        :depth="depth + 1"
        :category="currentCategory"
        :key="currentCategory.name"
        :checkedCategories="checkedCategories"
        @select="(category: Category) => handleSelect(category)"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Category } from '../App.vue';

@Options({
  props: {
    category: {
      type: Object,
      required: true
    },
    showChildrens: {
      type: Boolean,
      required: true
    },
    checkedCategories: {
      type: Array,
      required: true
    },
    depth: {
      type: Number,
      required: true
    }
  },
  watch: {
    showChildrens(value: boolean) {
      if (!value) {
        this.hoveredCategory = ''
      }
    }
  },
  emits: [
    'select',
  ],
  data() {
    return {
      hoveredCategory: ''
    }
  },
  methods: {
    handleSelect(category: Category): void {
      this.$emit('select', category)
    }
  }
})
export default class BaseCategoryFilterItem extends Vue {
  category!: Category
  checkedCategories!: Array<string>
  depth!: number
  hoveredCategory!: string
  showChildrens!: boolean
  handleSelect!: ((category: Category) => void)
}
</script>
