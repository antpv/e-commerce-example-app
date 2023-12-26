<template>
  <div class="products">
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
