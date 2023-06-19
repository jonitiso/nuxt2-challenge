<template xmlns:data-signature="http://www.w3.org/1999/xhtml">
  <div>
    <div>
      <div class="mb-6 border-b border-b-fuchsia-400 pb-0.5">
        <div class="text-primary text-lg font-semibold">Shopping Cart</div>
      </div>
      <template v-for="(item, i) in cartItems">
        <div
          :key="i"
          class="flex items-center gap-6 mb-3 pb-3 border-b border-b-gray-200"
        >
          <div
            class="center bg-primary flex h-14 w-14 items-center rounded-full p-2 text-xl text-white justify-center"
          >
            {{ item.quantity }}
          </div>
          <img :src="item.productImageUrl" class="w-24" />
        </div>
      </template>

      <div class="text-right py-3">
        <h3 class="text-3xl font-semibold">
          <span class="text-gray-400">Total:</span>
          <span class="text-primary">{{
            $store.getters.totalToPay | currency
          }}</span>
        </h3>
      </div>
    </div>

    <form v-if="isPaymentDataLoaded">
      <script
        src="https://checkout.wompi.co/widget.js"
        data-render="button"
        data-public-key="pub_test_MNqgLHbMnALPxFFIDzBHp6FMBYN9Qvof"
        data-currency="COP"
        :data-amount-in-cents="totalToPay * 100"
        :data-reference="paymentRef"
        data-signature:integrity="test_integrity_Xn5KqtFhqgEjUj3YQhbdTk7t1dvGi9pu"
      ></script>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { CartItem, Product } from '~/store'

export default Vue.extend({
  name: 'IndexPage',
  data: () => ({
    paymentRef: '',
    isPaymentDataLoaded: false,
    totalToPay: 0,
  }),
  computed: {
    products(): Product[] {
      return this.$store.state.products
    },
    amountToPay() {
      return this.$store.getters.getTotalAmountFromCart
    },
    cartItems(): CartItem[] {
      return Object.values(this.$store.state.cart)
    },
  },
  mounted() {
    this.$store.dispatch('syncWithLocalStorage')
    this.generatePaymentRef()
    this.totalToPay = this.getTotalAmountFromCart()
    this.isPaymentDataLoaded = true
  },
  methods: {
    generatePaymentRef() {
      this.paymentRef = uuidv4()
    },
    getTotalAmountFromCart() {
      const cart = this.$store.state.cart
      return Object.values(cart).reduce(
        (acc: number, item: any) => acc + item.quantity * item.price,
        0
      )
    },
    selectItem(item: Product) {
      this.$store.commit('SET_SELECTED_PRODUCT', item)
    },
  },
})
</script>
