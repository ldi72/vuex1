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
        answer.key = key
        store.commit('SetUser', answer)
      } catch {
        alert('Не верный логин или пароль')
        return
      }
      // console.log(store.state.User.UserID)

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

.col {
  border: 1px solid lightgray;
  overflow: hidden auto;
  min-width: 33%;
}

.column {
  display: none;
  border: 1px solid lightgray;
  overflow: hidden auto;
  min-width: 33%;
}
</style>
