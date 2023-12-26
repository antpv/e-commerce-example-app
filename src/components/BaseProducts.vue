<template>
  <div class="products">
    <h1>Products: ({{ products.length }} items)</h1>
    <BaseProduct
      class="products__product"
      v-for="product in products"
      :key="product.product"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseProduct from './BaseProduct.vue'
import { Product } from '../App.vue';

@Options({
  components: {
    BaseProduct
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
})
export default class BaseProducts extends Vue {
  products!: Product[]
}
</script>

<style lang="scss">
.products {
  padding: 36px 0;
  &__product {
    padding: 12px 0;
    border-top: 1px solid #A9A9A9;
  }
}
</style>
