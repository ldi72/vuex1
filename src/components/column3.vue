<template>
  <div class="colUser">
    <div class="inputRow">
      <div class="nameInput">ПОЛЬЗОВАТЕЛЬ</div>
      <div class="boxInput">
        <select v-model="selectedUser">
        <option v-for="item in Users" :value="item" v-bind:key="item.index">
          {{ item.Name }}
        </option>
        </select>
        <button v-show="showAddUserButton" @click="AddUserClick">ДОБАВИТЬ</button>
        <button @click="SaveUserClick">СОХРАНИТЬ</button>
      </div>
    </div>
    <br>
    <div class="inputRow">
      <div class="nameInput">ФИО</div>
      <div class="boxInput">
        <input v-model="inputName" type="text" maxlength="50">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Логин</div>
      <div class="boxInput">
        <input v-model="inputLogin" type="text" maxlength="50">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Пароль</div>
      <div class="boxInput">
        <input v-model="inputPasswd" type="text" maxlength="50">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Роль в системе</div>
      <div class="boxInput">
        <select v-model="selectedRule">
        <option v-for="item in filterUserRules" :value="item.Rule" v-bind:key="item.Rule">
          {{ item.text }}
        </option>
        </select>
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Доверенность</div>
      <div class="boxInput">
        <input v-model="inputDocProxy" type="text" maxlength="20">
      </div>
    </div>

  </div>
</template>

<script>
import store from '../store'
const LA = require('../lib/Requests')

export default {
  name: 'column3',
  store,
  data () {
    return {
    }
  },
  computed: {
    showAddUserButton: () => {
      try {
        return (store.state.Selected.selectedUser.UserID !== undefined)
      } catch { return false }
    },
    Users: () => {
      try {
        return store.state.Selected.selectedBranch.Users.filter(item => item.UserRule >= store.state.User.UserRule)
      } catch { return {} }
    },

    filterUserRules: () => store.state.UserRules
      .filter(item => item.Rule >= store.state.User.UserRule),

    selectedUser: {
      get () {
        return store.state.Selected.selectedUser
      },
      set (selectedUser) {
        store.commit('SetSelected', { selectedUser })
      }
    },
    inputName: {
      get () {
        let text
        try { text = store.state.Selected.selectedUser.Name } catch { return undefined }
        store.commit('SetAddUser', { Name: text })
        return text
      },
      set (inputName) {
        store.commit('SetAddUser', { Name: inputName.trim() })
      }
    },
    inputLogin: {
      get () {
        let text
        try { text = store.state.Selected.selectedUser.Login } catch { return undefined }
        store.commit('SetAddUser', { Login: text })
        return text
      },
      set (inputLogin) {
        store.commit('SetAddUser', { Login: inputLogin.trim() })
      }
    },
    inputPasswd: {
      get () {
        // let text
        // try { text = store.state.Selected.selectedUser.Passwd } catch { return undefined }
        store.commit('SetAddUser', { Passwd: '' })
        return ''
      },
      set (inputPasswd) {
        store.commit('SetAddUser', { Passwd: inputPasswd.trim() })
      }
    },
    selectedRule: {
      get () {
        let text
        try { text = store.state.Selected.selectedUser.UserRule } catch { return undefined }
        store.commit('SetAddUser', { UserRule: text })
        return text
      },
      set (selectedRule) {
        store.commit('SetAddUser', { UserRule: selectedRule })
      }
    },
    inputDocProxy: {
      get () {
        let text
        try { text = store.state.Selected.selectedUser.DataInfo.DocProxy } catch { return undefined }
        store.commit('SetAddUser', { DataInfo: store.getters.Selected.selectedUser.DataInfo })
        return text
      },
      set (inputDocProxy) {
        let DataInfo = store.state.AddUser.DataInfo
        if (DataInfo === undefined) DataInfo = {}
        DataInfo.DocProxy = inputDocProxy.trim()
        store.commit('SetAddUser', { DataInfo: DataInfo })
      }
    }

  },
  methods: {
    AddUserClick () {
      store.commit('SetAddUser', { AddUser: {} })
    },
    async SaveUserClick () {
      let BranchID, UserID
      if (!(BranchID = store.state.Selected.selectedBranch.BranchID)) {
        alert('Для какого филиала создается пользователь?')
        return
      }
      store.commit('SetAddUser', { BranchID: BranchID })

      try {
        if ((UserID = store.state.Selected.selectedUser.UserID)) {
          store.commit('SetAddUser', { UserID: UserID })
        } else store.commit('SetAddUser', { UserID: 0 })
      } catch { store.commit('SetAddUser', { UserID: 0 }) }

      if (!store.state.AddUser.Name) {
        alert('Введите ФИО пользователя.')
        return
      }
      if (!store.state.AddUser.Login) {
        alert('Введите Логин.')
        return
      }
      if (!store.state.AddUser.Passwd && store.state.AddUser.UserID === 0) {
        alert('Введите Пароль.')
        return
      }
      if (isNaN(store.state.AddUser.UserRule)) {
        alert('Введите Роль пользователя в системе.')
        return
      }
      let DataInfo = store.state.AddUser.DataInfo
      if (DataInfo === undefined) DataInfo = {}

      if (!DataInfo.DocProxy && (store.state.AddUser.UserRule === 1 || store.state.AddUser.UserRule === 2)) {
        alert('Введите доверенность.')
        return
      }
      store.commit('SetAddUser', { DataInfo: DataInfo })
      store.commit('SetAddUser', { StatFlag: 0 })

      const arrayToString = JSON.stringify(Object.assign({}, store.state.AddUser))
      let ans
      try {
        ans = await LA.request('/users/' + store.state.User.UserID, 'POST', arrayToString, store.state.User.key)
      } catch (error) {
        alert(error.statusText)
        return
      }
      if (ans.Value === 0) {
        alert('ВНИМАНИЕ! Запись не сохранилась.')
        return
      }
      if (!UserID) UserID = ans.Value

      let res
      try {
        res = await LA.GetContent('/users/lists/' + store.state.User.UserID, store.state.User.key)
      } catch (error) {
        alert(error.statusText)
        return
      }
      store.commit('SetLists', res.result[0])
      store.commit('SetSelected', { selectedCompany: store.state.Lists.Companies.find(function (item) { return item.CompanyID === 1 }) })
      store.commit('SetSelected', {
        selectedBranch: store.state.Selected.selectedCompany.Branches
          .find(function (item) { return item.BranchID === BranchID })
      })
      store.commit('SetSelected', {
        selectedUser: store.state.Selected.selectedBranch.Users
          .find(function (item) { return item.UserID === UserID })
      })
      alert('УСПЕШНО! Запись сохранена.')
    }
  }
}
</script>

<style scoped>
</style>
