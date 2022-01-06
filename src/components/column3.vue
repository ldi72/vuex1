<template>
  <div class="column">
    <label v-for="item in selectedAmounts" v-bind:key="item.id">
      id: {{ item.id }}, amount: {{ item.amount }}
      <br>
    </label>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'column3',
  store,

  computed: {
    selectedAmounts: () =>
      store.getters.selectedAmounts
  }
}
</script>

<style scoped>
</style>
