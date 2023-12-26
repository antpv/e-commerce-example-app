<template>
  <div class="product">
    <div class="product__name">
      {{ product.product }}
    </div>
    <div class="product__category">
      {{ product.category.join(', ') }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Product } from '../App.vue';

@Options({
  components: {
    BaseProduct
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
})
export default class BaseProduct extends Vue {
  product!: Product
}
</script>
