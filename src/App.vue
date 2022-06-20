<template>
  <div id="app">
  <div class = "LoginPage">
    <div>
      <input placeholder="Пользователь" v-model="inpLogin">
      <input type="password" placeholder="Пароль" v-model="inpPassword">
      <button @click="loginClick">ВОЙТИ</button>
    </div>
  </div>
    <div class = "MainPage" v-show="mainPageVisible">
      <column1/>
      <column2/>
      <column3/>
    </div>
  </div>
</template>

<script>
import column1 from './components/column1'
import column2 from './components/column2'
import column3 from './components/column3'
import store from './store'
const LA = require('./lib/Requests')

export default {
  name: 'App',
  components: {
    column1, column2, column3
  },
  store,

  data () {
    return {
      mainPageVisible: false,
      inpLogin: '',
      inpPassword: ''
    }
  },
  computed: {

  },
  methods: {
    loginClick () {
      if (this.inpLogin === '') {
        alert('Введите логин')
        return
      }
      if (this.inpPassword === '') {
        alert('Введите пароль')
        return
      }
      this.LoadUser()
    },

    async LoadUser () {
      const key = LA.cryptP(this.inpPassword)
      let answer
      try {
        answer = await LA.GetContent('/users', this.inpLogin)
      } catch (error) {
        alert(error.statusText)
        return
      }
      try {
        const decrypt = LA.decrypt(answer.Value, key)
        answer = JSON.parse(decrypt)
        answer.key = LA.encrypt(this.inpLogin, key)
        store.commit('SetUser', answer)
      } catch {
        alert('Не верный логин или пароль')
        return
      }

      try {
        answer = await LA.GetContent('/users/lists/' + answer.UserID, answer.key)
      } catch (error) {
        alert(error.statusText)
        return
      }
      store.commit('SetLists', answer.result[0])
      store.commit('SetSelected', { selectedCompany: store.state.Lists.Companies.find(function (item) { return item.CompanyID === 1 }) })
      store.commit('SetSelected', {
        selectedBranch: store.state.Selected.selectedCompany.Branches
          .find(function (item) { return item.BranchID === store.state.User.BranchID })
      })

      if (store.state.User.UserRule < 0) store.commit('SetDisCompany', false)
      if (store.state.User.UserRule < 1) store.commit('SetDisBranch', false)

      const elements = document.getElementsByClassName('LoginPage')
      while (elements.length > 0) {
        elements[0].remove()
      }
      this.mainPageVisible = true
    }
  }
}
</script>

<style>
html, body, #app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.MainPage {
  display: flex;
}

.LoginPage {
  /*flex: 1;*/
  width: 100%;
  height: calc(100vh - 100px);
  text-align: center;
}

.LoginPage div {
  margin-left: calc(50vw -  10em);
  width: 20em;
}

.LoginPage div input, .LoginPage div button{
  vertical-align: top;
  overflow-wrap: break-word;
  font-size: 20px;
  height: 35px;
  margin-top: 1em;
  width: 100%;
}

.colUser, .colBranch, .colCompany {
  border: 1px solid lightgray;
  overflow: hidden auto;
}

.colUser, .colBranch {
  min-width: 40%;
}

.colCompany {
  min-width: 20%;
}

</style>
