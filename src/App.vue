<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
       <!-- <router-link to="/canvas">画布</router-link>|
        <router-link to="/createjs">createjs</router-link> -->
        <router-link to="/konva">konva</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body,#app{
  width: 100%;
  height: 100%;;
}

#nav {
  padding: 30px;
  position: fixed;
  right:0;
  bottom:0;
  z-index:100;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
