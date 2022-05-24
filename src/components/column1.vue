<template>
  <div class="colCompany">
    <div class="inputRow">
      <div class="nameInput">ОРГАНИЗАЦИЯ</div>
      <div class="boxInput">
        <select :disabled="disCompany" v-model="selectedCompany">
        <option v-for="item in Companies" :value="item" v-bind:key="item.CompanyID">
          {{ item.CompanyName }}
        </option>
        </select>
      </div>
    </div>
    <br>

  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'column1',
  store,
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    Companies: () => {
      if (!store.state.Lists.Companies) return
      return store.state.Lists.Companies
    },
    selectedCompany: {
      get () {
        return store.state.Selected.selectedCompany
      },
      set (selectedCompany) {
        store.commit('SetSelected', { selectedCompany })
        store.commit('SetSelected', { selectedBranch: {} })
        store.commit('SetAddUser', { AddUser: {} })
      }
    },
    disCompany: () => {
      return store.state.DisCompany
    }

  },
  methods: {
  }
}
</script>

<style scoped>
</style>
