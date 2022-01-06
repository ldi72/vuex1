<template>
  <div class="column">
    <input type="radio" id="one" value="1" v-model="pickedChild">
    <label for="one">Все</label>
    <br>
    <input type="radio" id="two" value="2" v-model="pickedChild">
    <label for="two">Меньше 0</label>
    <br>
    <input type="radio" id="three" value="3" v-model="pickedChild">
    <label for="three">Больше или равно 0</label>
    <br>
    <br>

    <button v-on:click="onClick('backward')">Назад</button>
    <button v-on:click="onClick('forward')">Вперед</button>
    <br>
    <br>

    <select v-model="ChangeSelect">
      <option v-for="option in options" :value="option.idx" v-bind:key="option.idx">
        {{ option.text }}
      </option>
    </select>

  </div>
</template>

<script>
import { computed } from 'vue'
import store from '../store'

export default {
  name: 'column1',
  store,

  setup () {
    let stateDirect = {
      sortedField: '',
      sortedDirect: '',
      ChangeSelect: 0
    }
    const options = [
      { field: 'id', direct: 'forward', text: 'СортВперед по id', idx: 0 },
      { field: 'id', direct: 'backward', text: 'СортНазад по id', idx: 1 },
      { field: 'amount', direct: 'forward', text: 'СортВперед по amount', idx: 2 },
      { field: 'amount', direct: 'backward', text: 'СортНазад по amount ', idx: 3 }
    ]
    const pickedChild = computed({
      get: () => store.state.checkedItems,
      set: pickedChild => store.commit('SetCheckedItems', pickedChild)
    })
    const onClick = (sortedDirect) => {
      stateDirect.sortedDirect = sortedDirect
      stateDirect = directServ(stateDirect, options)
      store.commit('SetDirect', stateDirect)
    }
    const ChangeSelect = computed({
      get: () => store.state.ChangeSelect,
      set (ChangeSelect) {
        stateDirect.ChangeSelect = ChangeSelect
        stateDirect.sortedField = options[ChangeSelect].field
        stateDirect.sortedDirect = options[ChangeSelect].direct
        store.commit('SetDirect', stateDirect)
      }
    })
    return {
      pickedChild,
      options,
      onClick,
      ChangeSelect
    }
  }
}
const directServ = (state, options) => {
  if (state.sortedDirect === 'forward') {
    if (options.length - 1 === state.ChangeSelect) state.ChangeSelect = 0
    else state.ChangeSelect += 1
  } else {
    if (state.ChangeSelect === 0) state.ChangeSelect = options.length - 1
    else state.ChangeSelect -= 1
  }
  state.sortedField = options[state.ChangeSelect].field
  state.sortedDirect = options[state.ChangeSelect].direct
  return state
}
</script>

<style scoped>
</style>
