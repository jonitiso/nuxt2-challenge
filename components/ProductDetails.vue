<template>
  <div>
    <div class="relative p-3">
      <div
        class="center bg-primary absolute left-1.5 top-1 flex h-8 w-8 items-center rounded-full p-2 text-sm text-white justify-center"
      >
        {{ computedProductQty }}
      </div>
      <img :src="product.imageUrl" alt="" />
    </div>
    <div class="flex border-b border-b-fuchsia-500 pb-2">
      <div class="flex flex-1 items-center gap-2">
        <h3 class="text-lg font-bold">{{ product?.name }}</h3>
        <div class="dot h-1 w-1 rounded-full bg-fuchsia-200"></div>
        <div class="text-primary text-lg font-semibold">
          {{ formatMoney(product?.price) }}
        </div>
      </div>
      <div class="mr-3 flex items-center text-2xl font-bold">
        <button
          class="flex h-8 w-10 items-center justify-center bg-gray-100 pb-1"
          @click="subtractFromCart"
        >
          -
        </button>
        <button
          class="bg-primary flex h-8 w-10 items-center justify-center pb-1 text-white"
          @click="addToCart"
        >
          +
        </button>
      </div>
    </div>
    <p class="border-b border-b-fuchsia-500 py-3 text-gray-500">
      {{ product?.description }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '~/store'

export default defineComponent({
  name: 'ProductDetails',
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  computed: {
    computedProductQty() {
      return (
        this.$store.state.cart[`p_${this.$store.state.selectedProduct?.id}`]
          ?.quantity || 0
      )
    },
  },
  methods: {
    formatMoney(value: number) {
      const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
      return USDollar.format(value)
    },
    addToCart() {
      this.$store.dispatch('addToCart', {
        key: `p_${this.product?.id}`,
        quantity: 1,
        productId: this.product?.id,
        price: this.product?.price,
        productImageUrl: this.product?.imageUrl,
      })
      this.$forceUpdate()
    },
    subtractFromCart() {
      this.$store.dispatch('subtractFromCart', {
        key: `p_${this.$store.state.selectedProduct?.id}`,
      })
      this.$forceUpdate()
    },
  },
})
</script>

<style scoped></style>
