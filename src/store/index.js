import { createStore } from 'vuex'

const sortBy = (key) => (a, b) => a[key] - b[key]

export default createStore({
  state: {
    User: [],
    rndData: [],
    selectedAmounts: [],
    checkedItems: 1,
    ChangeSelect: 0,
    sortedDirect: 'forward',
    sortedField: 'id'
  },
  getters: {
    rndData: state => {
      return state.rndData
    },

    selectedAmounts: state => {
      return state.selectedAmounts
    },

    SortedFilteredData: (state, getters) => {
      const FilteredData = getters.FilteredData(state.checkedItems)
      // const sortBy = (key) => (a, b) => a[key] - b[key]
      FilteredData.sort(sortBy(state.sortedField))
      if (state.sortedDirect === 'backward') FilteredData.reverse()
      return FilteredData
    },

    FilteredData: (_, getters) => (checkedItems) => {
      if (checkedItems === '2') return getters.rndData.filter(function (item) { return item.amount < 0 })
      else if (checkedItems === '3') return getters.rndData.filter(function (item) { return item.amount >= 0 })
      return getters.rndData
    }
  },
  mutations: {
    SetUser (state, User) {
      state.User = User
    },
    AddRndData (state, data) {
      state.rndData.push(data)
    },
    UpdSelectedAmounts (state, data) {
      state.selectedAmounts = data
    },
    SetRndData (state, item) {
      state.rndData.splice(item.id - 1, 1, item)
    },
    SetCheckedItems (state, item) {
      state.checkedItems = item
    },
    SetDirect (state, Direct) {
      state.ChangeSelect = Direct.ChangeSelect
      state.sortedDirect = Direct.sortedDirect
      state.sortedField = Direct.sortedField
    }
  },
  actions: {
    AddRndData (stateAdd, data) {
      stateAdd.commit('AddRndData', data)
    }
  },
  modules: {
  }
})
