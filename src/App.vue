<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html,
body,
#app {
  width: 100vw;
  overflow-x:hidden;
  overflow-y:auto;
  box-sizing: border-box
}

</style>
