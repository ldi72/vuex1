import { createStore } from 'vuex'

// const sortBy = (key) => (a, b) => a[key] - b[key]

export default createStore({
  state: {
    User: [],
    AddUser: [],
    Lists: [],
    Selected: [],
    DisCompany: true,
    DisBranch: true,

    UserRules: [
      { text: 'Администратор организации', Rule: 0 },
      { text: 'Администратор филиала', Rule: 1 },
      { text: 'Эксперт', Rule: 2 },
      { text: 'Оператор', Rule: 3 }
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
