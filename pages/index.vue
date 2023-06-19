<template>
  <div>
    <div class="mb-6 border-b border-b-fuchsia-400 pb-0.5">
      <div class="text-primary text-lg font-semibold">Product</div>
    </div>
    <template v-if="selectedProduct">
      <product-details :product="selectedProduct" />
    </template>
    <template v-else>
      <p class="text-gray-500">Please choose a product on the left.</p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Product } from '~/store'

export default Vue.extend({
  name: 'IndexPage',
  data: () => ({
    cartTotalAmount: 0,
  }),
  computed: {
    products() {
      return this.$store.state.products
    },
    selectedProduct() {
      return this.$store.state.selectedProduct
    },
  },
  methods: {
    selectProduct(product: Product) {
      this.$store.commit('SET_SELECTED_PRODUCT', product)
    },
  },
})
</script>
