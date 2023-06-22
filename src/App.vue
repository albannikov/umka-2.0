<script setup>
import router from './router';
import Main from './components/DashBoard.vue'
</script>

<template>  
<router-view></router-view>
<vue3-snackbar bottom right></vue3-snackbar>
  <!-- <Main msg="Dashboard" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

