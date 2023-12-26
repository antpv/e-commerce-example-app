<template>
  <div class="filters">
    <!-- SELECT FILTERS -->
    <BaseSelect
      :options="displayFilterOptions"
      :selectedKeys="activeDisplayFilters"
      @select="toggleDisplayFilter"
      class="filters__filter"
    />
    <!-- TREE FILTER -->
    <div 
      class="filters__filter"
      v-if="activeDisplayFilters.includes('tree')"
    >
      <BaseCategoryFilter
        :tree="categories"
        :checkedCategories="checkedCategories"
        @changeCheckedCategories="(payload: string[]) => $emit('update:checkedCategories', payload)"
      />
      <span
        @click="cancelFilter('tree')"
        class="filters__close"
      >
        <img src="../assets/close.svg" />
      </span>
    </div>
    <!-- SEARCH FILTER -->
    <div
      class="filters__filter"
      v-if="activeDisplayFilters.includes('search')"
    >
      <input :value="search" @input="handleSearch" />
      <span
        @click="cancelFilter('search')"
        class="filters__close"
      >
        <img src="../assets/close.svg" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseSelect from './BaseSelect.vue';
import BaseCategoryFilter from './BaseCategoryFilter.vue';
import { Category, ActiveFiltersOption } from '../App.vue';

export enum AllowedFilters {
  tree,
  search
}

@Options({
  components: {
    BaseSelect,
    BaseCategoryFilter
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    displayFilterOptions: {
      type: Array,
      required: true
    },
    checkedCategories: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      required: true
    },
    displayFilters: {
      type: Array,
      required: true
    }
  },
  created() {
    this.activeDisplayFilters = this.displayFilters
  },
  data() {
    return {
      activeDisplayFilters: []
    }
  },
  emits: [
    'update:search',
    'update:checkedCategories',
    'update:displayFilters'
  ],
  methods: {
    toggleDisplayFilter(key: string): void {
      const hasOption: string | undefined =
        (this.activeDisplayFilters as string[]).find((optionKey) => key === optionKey)

      if (hasOption) {
        this.activeDisplayFilters = this.activeDisplayFilters.filter((optionKey: string) => optionKey !== key)
      } else {
        this.activeDisplayFilters.push(key)
      }
      
      this.$emit('update:displayFilters', this.activeDisplayFilters)
    },
    handleSearch(event: InputEvent): void {
      const { value } = event.target as HTMLInputElement

      this.$emit('update:search', value)
    },
    cancelFilter(key: string) {
      this.activeDisplayFilters = this.activeDisplayFilters.filter((activeKey: string) => activeKey !== key)
      this.$emit('update:displayFilters', this.activeDisplayFilters)
      if (key === 'tree') {
        this.$emit('update:checkedCategories', [])
      } else if (key === 'search') {
        this.$emit('update:search', '')
      }
    }
  }
})
export default class BaseFilters extends Vue {
  categories!: Category[]
  checkedCategories!: string[]
  displayFilterOptions!: ActiveFiltersOption[]
  activeDisplayFilters!: string[]
  displayFilters!: string[]
  allowedFilters!: AllowedFilters
  search!: string
  toggleDisplayFilter: ((key: string) => void) | undefined
  handleSearch: ((payload: Event) => void) | undefined
  cancelFilter!: (key: string) => void
}
</script>

<style lang="scss">
.filters {
  padding: 12px 0;
  &__close {
    border: 1px solid #A9A9A9;
    padding: 8px;
    border-radius: 4px;
    line-height: 0;
    margin-left: 12px;
    cursor: pointer;
    & * {
      pointer-events: none;
    }
  }
  &__filter {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    &:last-child {
      margin: 0;
    }
  }
}
</style>
