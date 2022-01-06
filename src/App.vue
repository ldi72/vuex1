<template>
  <div id="app">
    <column1/>
    <column2/>
    <column3/>
  </div>
</template>

<script>
import column1 from './components/column1'
import column2 from './components/column2'
import column3 from './components/column3'

export default {
  name: 'App',
  components: {
    column1, column2, column3
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
#app {
  display: flex;
}
.column {
  border: 1px solid lightgray;
  overflow: hidden auto;
  min-width: 33%;
}
</style>
