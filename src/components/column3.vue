<template>
  <div class="col">
      <div class="nameInput">ПОЛЬЗОВАТЕЛЬ</div>
      <div class="boxInput">
        <select :disabled="disInp" v-model="selectedUser">
          <option v-for="item in recipientShema" :value="item" v-bind:key="item.index">
            {{ item.PayObj }}
          </option>
        </select>
      </div>
  </div>

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
