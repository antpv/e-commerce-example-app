<template>
  <li>
    <input
      type="checkbox"
      :checked="checkedCategories.includes(category.name)"
      @input="handleSelect(category)"
    />
    {{ category.name }}
    <ul v-if="category.categories.length">
      <BaseCategoryFilterItem
        v-for="currentCategory in category.categories"
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
    checkedCategories: {
      type: Array,
      required: true
    }
  },
  emits: [
    'select',
  ],
  methods: {
    handleSelect(category: Category): void {
      this.$emit('select', category)
    }
  }
})
export default class BaseCategoryFilterItem extends Vue {
  category!: Category
  checkedCategories!: Array<string>
  handleSelect!: ((category: Category) => void)
}
</script>
