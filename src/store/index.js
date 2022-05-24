import { createStore } from 'vuex'

// const sortBy = (key) => (a, b) => a[key] - b[key]

export default createStore({
  state: {
    User: [],
    AddUser: [],
    AddBranch: [],
    Lists: [],
    Selected: [],
    DisCompany: true,
    DisBranch: true,

    UserRules: [
      { text: 'Администратор организации', Rule: 0 },
      { text: 'Администратор филиала', Rule: 1 },
      { text: 'Эксперт', Rule: 2 },
      { text: 'Оператор', Rule: 3 },
      { text: 'Бухгалтер', Rule: 4 }
    ]
  },
  getters: {
    User: state => {
      return state.User
    },
    Lists: state => {
      return state.Lists
    },
    Selected: state => {
      return state.Selected
    }
  },
  mutations: {
    SetUser (state, User) {
      state.User = User
    },
    SetAddUser (state, AddUser) {
      const key = Object.keys(AddUser)
      if (key[0] === 'AddUser') {
        state.AddUser = {}
        state.Selected.selectedUser = {}
      } else state.AddUser[key] = AddUser[key]
    },
    SetAddAllInBranch (state, AddBranch) {
      const key = Object.keys(AddBranch)
      state.AddBranch = AddBranch[key]
    },
    SetAddBranch (state, AddBranch) {
      const key = Object.keys(AddBranch)
      if (key[0] === 'AddBranch') {
        state.AddBranch = {}
        state.AddUser = {}
        state.Selected.selectedBranch = {}
        state.Selected.selectedUser = {}
      } else state.AddBranch[key] = AddBranch[key]
    },
    SetLists (state, Lists) {
      state.Lists = Lists
    },
    SetSelected (state, Selected) {
      state.Selected[Object.keys(Selected)] = Selected[Object.keys(Selected)]
    },
    SetDisCompany (state, DisCompany) {
      state.DisCompany = DisCompany
    },
    SetDisBranch (state, DisBranch) {
      state.DisBranch = DisBranch
    }

  },
  actions: {
  },
  modules: {
  }
})
