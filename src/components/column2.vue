<template>
  <div class="column">
    <label v-for="item in SortedFilteredData" v-bind:key="item.id">
      <input type="checkbox" v-bind:value="item" v-model="selectedAmounts">
      {{ item }}
      <button v-on:click="SetRndData(item, 1) /*item.amount +=1*/">+1</button>
      <button v-on:click="item.amount -=1">-1</button>
      <br>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '../store'

export default {
  name: 'column2',
  store,

  setup () {
    const SortedFilteredData = computed(() => store.getters.SortedFilteredData)

    const selectedAmounts = computed({
      get () {
        return store.state.selectedAmounts
      },
      set (selectedAmounts) {
        store.commit('UpdSelectedAmounts', selectedAmounts)
      }
    })

    const SetRndData = (item, n) => {
      item.amount += n
      store.commit('SetRndData', item)
    }

    for (let i = 0; i < 100; i++) {
      store.dispatch('AddRndData', { id: i + 1, amount: Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000) })
    }
    return {
      selectedAmounts,
      SortedFilteredData,
      SetRndData
    }
  }
}

</script>

<style scoped>
</style>
