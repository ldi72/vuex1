<template>
  <div class="colBranch">
    <div class="inputRow">
      <div class="nameInput">ФИЛИАЛ</div>
      <div class="boxInput">
        <select :disabled="disBranch" v-model="selectedBranch">
        <option v-for="item in Branches" :value="item" v-bind:key="item.BranchID">
          {{ item.Name }}
        </option>
        </select>
        <button :disabled="disBranch" @click="AddBranchClick">ДОБАВИТЬ</button>
        <button :disabled="disBranch" @click="SaveBranchClick">СОХРАНИТЬ</button>
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Название</div>
      <div class="boxInput">
        <input :disabled="disBranch" v-model="inputNameBranch" type="text" maxlength="256">
      </div>
    </div>

  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'column2',
  store,

  created () {
  },
  data () {
    return {
    }
  },
  computed: {
    Branches: () => {
      if (!store.state.Selected.selectedCompany) return
      return store.state.Selected.selectedCompany.Branches
    },
    selectedBranch: {
      get () {
        return store.state.Selected.selectedBranch
      },
      set (selectedBranch) {
        store.commit('SetSelected', { selectedBranch })
        store.commit('SetAddUser', { AddUser: {} })
      }
    },
    disBranch: () => {
      return store.state.DisBranch
    },
    inputNameBranch: () => {
      if (!store.state.Selected.selectedBranch) return
      return store.state.Selected.selectedBranch.Name
    }

  },
  methods: {
    AddBranchClick () {
      store.commit('SetSelected', { selectedBranch: {} })
      store.commit('SetAddUser', { AddUser: {} })
    },
    SaveBranchClick () {

    }
  }
}

</script>

<style scoped>
</style>
