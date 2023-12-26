<template>
  <div class="select">
    <span class="select__title">
      {{ selectTitle }}
    </span>
    <ul class="select__tree">
      <BaseCategoryFilterItem
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
  handleSelect!: ((name: string) => void)
}
</script>
