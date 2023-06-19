export type Product = {
  id: number
  name: string
  price: number
  description: string
  qty?: number
  imageUrl: string
}

export type CartItem = {
  productId: number
  quantity: number
  price: number
  productImageUrl?: string
}

export type AppState = {
  products: Product[]
  cart: Record<string, CartItem>
  selectedProduct?: Product | null
}
export const state = () =>
  ({
    products: [
      {
        id: 1,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/402',
      },
      {
        id: 2,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/520',
      },
      {
        id: 3,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/702',
      },
      {
        id: 4,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/502',
      },
      {
        id: 5,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/600',
      },
      {
        id: 6,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/508',
      },
      {
        id: 7,
        name: 'Milk',
        price: 1500,
        description: 'lorem ipsum',
        imageUrl: 'https://loremflickr.com/502/501',
      },
    ],
    cart: {},
    selectedProduct: null,
  } as AppState)

export const getters = {
  totalToPay(state: any) {
    return Object.values(state.cart).reduce(
      (acc: number, item: any) => acc + item.quantity * item.price,
      0
    )
  }
}

export const mutations = {
  SET_PRODUCTS(state: AppState, products: Product[]) {
    state.products = products
  },
  ADD_TO_CART(
    state: AppState,
    {
      key,
      quantity,
      productId,
    }: { key: string; quantity: number; productId: number }
  ) {
    const cartItem = state.cart[key]
    if (cartItem) {
      state.cart[key] = {
        ...cartItem,
        quantity: cartItem.quantity + quantity,
      }
    } else {
      const product = state.products.find((product) => product.id === productId)
      state.cart[key] = {
        productId,
        quantity,
        price: product?.price || 0,
        productImageUrl: product?.imageUrl,
      }
    }
  },
  REMOVE_FROM_CART_BY_KEY(state: AppState, key: string) {
    delete state.cart[key]
  },
  SET_SELECTED_PRODUCT(state: AppState, product: Product | null) {
    state.selectedProduct = product
  },
  UPDATE_CART_ITEM(
    state: AppState,
    { key, value }: { key: string; value: CartItem }
  ) {
    state.cart[key] = value
  },
  UPDATE_PRODUCT(
    state: AppState,
    { product, index }: { product: Product; index: number }
  ) {
    state.products[index] = product
  },
  SET_CART(state: AppState, cart: Record<string, CartItem>) {
    state.cart = cart
  },
}

export const actions = {
  addToCart({ commit, state }: any, { key, quantity, productId }: any) {
    commit('ADD_TO_CART', { key, quantity, productId })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  subtractFromCart({ commit, state }: any, { key }: { key: string }) {
    const cartItem = state.cart[key]
    if (!cartItem) {
      return
    }
    if (cartItem.quantity === 1) {
      commit('REMOVE_FROM_CART_BY_KEY', key)
    } else {
      commit('UPDATE_CART_ITEM', {
        key,
        value: {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        },
      })
    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  getQtyFromCart({ state }: any, productId: number) {
    const cartItem = state.cart[productId]
    return cartItem ? cartItem.quantity : 0
  },
  syncWithLocalStorage({ commit }: any) {
    const cart = localStorage.getItem('cart')
    if (cart) {
      commit('SET_CART', JSON.parse(cart))
    } else {
      commit('SET_CART', {})
    }
  },
  formatMoney(value: number) {
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    return USDollar.format(value)
  },
}
