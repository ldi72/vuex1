<template>
  <div class="column">
    <label v-for="item in selectedAmounts" v-bind:key="item.id">
      id: {{ item.id }}, amount: {{ item.amount }}
      <br>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '../store'

export default {
  name: 'column3',
  store,

  setup () {
    const selectedAmounts = computed(() => store.getters.selectedAmounts)
    return { selectedAmounts }
  }
}
</script>

<style scoped>
</style>
