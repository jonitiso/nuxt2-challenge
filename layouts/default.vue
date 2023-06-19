<template>
  <div class="max-w-[80rem] m-auto">
    <div class="p-10">
      <div class="mb-4 flex flex-col md:flex-row items-center">
        <div class="flex-1 mb-4 md:mb-0">
          <div class="h-[5rem] w-[5rem] rounded-lg border bg-gradient-to-tl from-purple-950 to-purple-500"></div>
        </div>
        <template v-if="$route.name === 'index'">
          <nuxt-link class="bg-primary p-2 text-white" to="/cart">
            {{ $store.getters.totalToPay | currency }}
          </nuxt-link>
        </template>
        <template v-else>
          <div class="text-primary text-white flex font-semibold border border-fuchsia-600">
            <div class="bg-fuchsia-100 p-2">
              {{ $store.getters.totalToPay | currency }}
            </div>
            <nuxt-link to="/" class="bg-primary text-white py-2 px-3">
              X
            </nuxt-link>
          </div>
        </template>
      </div>
      <div class="flex flex-col md:flex-row gap-10">
        <div class="w-full md:w-7/12">
          <div class="mb-6 border-b border-b-fuchsia-400 pb-0.5">
            <h2 class="text-primary text-lg font-semibold">Store</h2>
          </div>
          <product-list @selected-product="selectProduct" />
        </div>
        <div class="w-full md:w-5/12 mt-10 md:mt-0">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '~/store'

export default defineComponent({
  name: 'DefaultLayout',
  mounted() {
    this.$store.dispatch('syncWithLocalStorage')
  },
  methods: {
    selectProduct(product: Product) {
      this.$store.commit('SET_SELECTED_PRODUCT', product)
    },
  },
})
</script>
