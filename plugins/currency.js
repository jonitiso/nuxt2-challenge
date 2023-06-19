import Vue from 'vue'

export default () => {
  Vue.filter('currency', function (value) {

    const USDollar = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    return USDollar.format(value || 0)
  })
}
