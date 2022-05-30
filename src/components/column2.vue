<template>
  <div class="colBranch">
    <div class="inputRow">
      <div class="nameInput">ФИЛИАЛ</div>
      <div class="boxInput">
        <select :disabled="disBranch" v-model="selectedBranch">
        <option v-for="item in Branches" :value="item" v-bind:key="item.BranchID">
          {{ item.BranchName }}
        </option>
        </select>
        <button v-show="showAddBranchButton" :disabled="disBranch" @click="AddBranchClick">ДОБАВИТЬ</button>
        <button :disabled="disBranch" @click="SaveBranchClick">СОХРАНИТЬ</button>
      </div>
    </div>
    <br>
    <div class="inputRow">
      <div class="nameInput">Название</div>
      <div class="boxInput">
        <input :disabled="disBranch" v-model="inputNameBranch" type="text" maxlength="256">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Широта</div>
      <div class="boxInput">
        <input :disabled="disBranch" v-model="inputLt" type="text" maxlength="9">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Долгота</div>
      <div class="boxInput">
        <input :disabled="disBranch" v-model="inputLg" type="text" maxlength="9">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Проверочная дистанция (м)</div>
      <div class="boxInput">
        <input :disabled="disBranch" v-model="inputDistance" type="text" maxlength="3">
      </div>
    </div>
    <div class="inputRow">
      <div class="nameInput">Тайм зона (+GMT)</div>
      <div class="boxInput">
        <input :disabled="disBranch" v-model="inputTZ" type="text" maxlength="1">
      </div>
    </div>

  </div>
</template>

<script>
import store from '../store'
const LA = require('../lib/Requests')

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
    showAddBranchButton: () => {
      try {
        return (store.state.Selected.selectedBranch.BranchID !== undefined)
      } catch { return false }
    },
    Branches: () => {
      if (!store.state.Selected.selectedCompany) return {}
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
    inputNameBranch: {
      get () {
        let text
        try { text = store.state.Selected.selectedBranch.BranchName } catch { return undefined }
        store.commit('SetAddBranch', { BranchName: text })
        return text
      },
      set (inputNameBranch) {
        store.commit('SetAddBranch', { BranchName: inputNameBranch.trim() })
      }
    },
    inputLt: {
      get () {
        let text
        try { text = store.state.Selected.selectedBranch.DataInfo.Lt } catch { return undefined }
        store.commit('SetAddBranch', { DataInfo: store.getters.Selected.selectedBranch.DataInfo })
        return text
      },
      set (inputLt) {
        let DataInfo = store.state.AddBranch.DataInfo
        if (DataInfo === undefined) DataInfo = {}
        DataInfo.Lt = inputLt.trim()
        store.commit('SetAddBranch', { DataInfo: DataInfo })
      }
    },
    inputLg: {
      get () {
        let text
        try { text = store.state.Selected.selectedBranch.DataInfo.Lg } catch { return undefined }
        store.commit('SetAddBranch', { DataInfo: store.state.Selected.selectedBranch.DataInfo })
        return text
      },
      set (inputLg) {
        let DataInfo = store.state.AddBranch.DataInfo
        if (DataInfo === undefined) DataInfo = {}
        DataInfo.Lg = inputLg.trim()
        store.commit('SetAddBranch', { DataInfo: DataInfo })
      }
    },
    inputDistance: {
      get () {
        let text
        try { text = store.state.Selected.selectedBranch.DataInfo.Distance } catch { return undefined }
        store.commit('SetAddBranch', { DataInfo: store.state.Selected.selectedBranch.DataInfo })
        return text
      },
      set (inputDistance) {
        let DataInfo = store.state.AddBranch.DataInfo
        if (DataInfo === undefined) DataInfo = {}
        DataInfo.Distance = inputDistance.trim()
        store.commit('SetAddBranch', { DataInfo: DataInfo })
      }
    },
    inputTZ: {
      get () {
        let text
        try { text = store.state.Selected.selectedBranch.DataInfo.TZ } catch { return undefined }
        store.commit('SetAddBranch', { DataInfo: store.state.Selected.selectedBranch.DataInfo })
        return text
      },
      set (inputTZ) {
        let DataInfo = store.state.AddBranch.DataInfo
        if (DataInfo === undefined) DataInfo = {}
        DataInfo.TZ = inputTZ.trim()
        store.commit('SetAddBranch', { DataInfo: DataInfo })
      }
    }

  },
  methods: {
    AddBranchClick () {
      store.commit('SetAddBranch', { AddBranch: {} })
    },
    async SaveBranchClick () {
      let BranchID, CompanyID
      if (!(CompanyID = store.state.Selected.selectedCompany.CompanyID)) {
        alert('Для какой организации создается филиал?')
        return
      }
      store.commit('SetAddBranch', { CompanyID: CompanyID })

      try {
        if ((BranchID = store.state.Selected.selectedBranch.BranchID)) {
          store.commit('SetAddBranch', { BranchID: BranchID })
        } else store.commit('SetAddBranch', { BranchID: 0 })
      } catch { store.commit('SetAddBranch', { BranchID: 0 }) }

      if (!store.state.AddBranch.BranchName) {
        alert('Введите название филиала.')
        return
      }

      let DataInfo = store.state.AddBranch.DataInfo
      if (DataInfo === undefined) DataInfo = {}

      if (!DataInfo.Lt || isNaN(DataInfo.Lt)) {
        alert('Проверьте Широту.')
        return
      }
      if (!DataInfo.Lg || isNaN(DataInfo.Lg)) {
        alert('Проверьте Долготу.')
        return
      }
      if (!DataInfo.Distance || isNaN(DataInfo.Distance)) {
        alert('Проверьте Дистанцию.')
        return
      }
      if (!DataInfo.TZ || isNaN(DataInfo.TZ)) {
        alert('Проверьте Тайм зону.')
        return
      }

      DataInfo.Lt = parseFloat(DataInfo.Lt)
      DataInfo.Lg = parseFloat(DataInfo.Lg)
      DataInfo.TZ = parseInt(DataInfo.TZ)
      DataInfo.Distance = parseInt(DataInfo.Distance)
      store.commit('SetAddBranch', { DataInfo: DataInfo })

      store.commit('SetAddBranch', { BranchRule: 0 })
      store.commit('SetAddBranch', { StatFlag: 0 })

      const arrayToString = JSON.stringify(Object.assign({}, store.state.AddBranch))
      let ans
      try {
        ans = await LA.request('/users/branch/' + store.state.User.UserID, 'POST', arrayToString, store.state.User.key)
      } catch (error) {
        alert(error.statusText)
        return
      }
      if (ans.Value === 0) {
        alert('ВНИМАНИЕ! Запись не сохранилась.')
        return
      }
      if (!BranchID) BranchID = ans.Value

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
      alert('УСПЕШНО! Запись сохранена.')
    }
  }
}

</script>

<style scoped>
</style>
