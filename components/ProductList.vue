<template>
  <div>
    <div class="flex gap-3">
      <div class="flex-1">
        <div
          v-for="(product, i) in products_col1"
          :key="i"
          class="mb-3 border-2 p-3 cursor-pointer relative"
          :class="[isProductSelected(product) ? 'border-fuchsia-500 product-shadow' : 'border-gray-300']"
          @click="selectProduct(product)"
        >
          <div
            v-if="computedProductQty(product.id) > 0"
            class="center bg-primary absolute left-1.5 top-1 flex h-8 w-8 items-center rounded-full p-2 text-sm text-white justify-center"
          >
            {{ computedProductQty(product.id) }}
          </div>
          <img :src="product.imageUrl" alt="" />
        </div>
      </div>

      <div class="flex-1">
        <div
          v-for="(product, i) in products_col2"
          :key="i"
          class="mb-3 border-2 p-3 cursor-pointer relative"
          :class="[isProductSelected(product) ? 'border-fuchsia-500 product-shadow' : 'border-gray-300']"
          @click="selectProduct(product)"
        >
          <div
            v-if="computedProductQty(product.id) > 0"
            class="center bg-primary absolute left-1.5 top-1 flex h-8 w-8 items-center rounded-full p-2 text-sm text-white justify-center"
          >
            {{ computedProductQty(product.id) }}
          </div>
          <img :src="product.imageUrl" alt="" />
        </div>
      </div>

      <div class="flex-1">
        <div
          v-for="(product, i) in products_col3"
          :key="i"
          class="mb-3 border-2 p-3 cursor-pointer relative"
          :class="[isProductSelected(product) ? 'border-fuchsia-500 product-shadow' : 'border-gray-300']"
          @click="selectProduct(product)"
        >
          <div
            v-if="computedProductQty(product.id) > 0"
            class="center bg-primary absolute left-1.5 top-1 flex h-8 w-8 items-center rounded-full p-2 text-sm text-white justify-center"
          >
            {{ computedProductQty(product.id) }}
          </div>
          <img :src="product.imageUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '~/store'

export default defineComponent({
  name: 'ProductList',
  computed: {
    // separe productos en 3 columnas equitativas
    products_col1() {
      return this.$store.state.products.slice(0, 2)
    },
    products_col2() {
      return this.$store.state.products.slice(2, 4)
    },
    products_col3() {
      return this.$store.state.products.slice(4, 6)
    },
    isProductSelected() {
      return (product: Product) => {
        return this.$store.state.selectedProduct === product
      }
    },
    computedProductQty() {
      return (productId: number) => {
        return this.$store.state.cart[`p_${productId}`]?.quantity || 0
      }
    },
  },
  methods: {
    selectProduct(product: Product) {
      this.$emit('selected-product', product)
    },
  },
})
</script>

<style scoped></style>
