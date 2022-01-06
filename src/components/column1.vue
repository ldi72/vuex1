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
import store from '../store'

export default {
  name: 'column1',
  store,

  data () {
    return {
      stateDirect: {
        sortedField: '',
        sortedDirect: '',
        ChangeSelect: 0
      },
      options: [
        { field: 'id', direct: 'forward', text: 'СортВперед по id', idx: 0 },
        { field: 'id', direct: 'backward', text: 'СортНазад по id', idx: 1 },
        { field: 'amount', direct: 'forward', text: 'СортВперед по amount', idx: 2 },
        { field: 'amount', direct: 'backward', text: 'СортНазад по amount ', idx: 3 }
      ]
    }
  },
  computed: {
    ChangeSelect: {
      get: () => store.state.ChangeSelect,
      set (ChangeSelect) {
        this.stateDirect.ChangeSelect = ChangeSelect
        this.stateDirect.sortedField = this.options[ChangeSelect].field
        this.stateDirect.sortedDirect = this.options[ChangeSelect].direct
        store.commit('SetDirect', this.stateDirect)
      }
    },
    pickedChild: {
      get: () => store.state.checkedItems,
      set: pickedChild => store.commit('SetCheckedItems', pickedChild)
    }

  },
  methods: {
    onClick (sortedDirect) {
      this.stateDirect.sortedDirect = sortedDirect
      this.stateDirect = directServ(this.stateDirect, this.options)
      store.commit('SetDirect', this.stateDirect)
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
