<template>
  <div id="app">
    <Main msg="Welcome to Your Vue.js App" />
    <Admin />
  </div>
</template>

<script>
import Main from './components/Main.vue';
import Admin from './components/Admin.vue';

export default {
  name: 'app',
  components: {
    Main,
    Admin,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
