<template>
  <h1>Filters</h1>
  <BaseFilters
    :categories="categoriesTree"
    :displayFilterOptions="displayFilterOptions"
    v-model:displayFilters="displayFilters"
    v-model:checkedCategories="checkedCategories"
    v-model:search="search"
  />
  <BaseProducts :products="productsMatching" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseFilters from './components/BaseFilters.vue';
import BaseProducts from './components/BaseProducts.vue';
import { mapActions, mapState } from 'vuex';

export interface Category {
  name: string
  categories: Category[]
}

export interface Product {
  product: string
  category: string[]
}

export interface ActiveFiltersOption {
  name: string
  key: string
}

@Options({
  components: {
    BaseFilters,
    BaseProducts
  },
  data() {
    return {
      checkedCategories: [],
      search: '',
      displayFilters: [],
      displayFilterOptions: [
        { key: 'tree', name: 'Category' },
        { key: 'search', name: 'Search' }
      ],
    }
  },
  computed: {
    ...mapState([
      'categoriesTree',
      'products',
      'fetching',
      'isFailure'
    ]),
    productsMatching() {
      let products = this.products
      if (this.displayFilters.includes('tree') && this.checkedCategories.length) {
        products = this.products.filter((product: Product) => {
          return this.checkedCategories.some((category: string) => {
            return product.category.includes(category)
          })
        })
      }
      return products.filter((product: Product) => {
        return product.product.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    ...mapActions(['getData'])
  },
  created() {
    this.getData()
  }
})
export default class App extends Vue {
  categoriesTree!: Category[]
  search!: string
  productsMatching!: Product[]
  displayFilters!: string[]
  checkedCategories!: string[]
  displayFilterOptions!: ActiveFiltersOption[]
}
</script>
