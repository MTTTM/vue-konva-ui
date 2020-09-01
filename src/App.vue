<template>
  <div id="app">
    <div id="nav">
      <p>linearLayout</p>
      <router-link to="/linearlayout">column</router-link>
      <router-link to="/linearlayout2">row</router-link>
      <router-link to="/multRowInCol">multRowInCol</router-link>
      <router-link to="/mulColInRow">mulColInRow</router-link>
      <router-link to="/linearlayout3">flexDir</router-link>
      <router-link to="/linearlayout4">alignItems</router-link>
      <router-link to="/linearlayout5">row alignItems</router-link>
      <router-link to="/linearLayoutBetween">linearLayoutBetween</router-link>
      <router-link to="/linearLayoutRowBetween">linearLayoutRowBetween</router-link>
      <router-link to="/linearLayoutColSpaceAround">linearLayoutColSpaceAround</router-link>
      <router-link to="/linearLayoutSpaceAround">linearLayoutSpaceAround</router-link>
      <router-link to="/linearLayoutWrap">column linearLayoutWrap</router-link>
      <router-link to="/linearLayoutWrap2">row linearLayoutWrap2</router-link>
      <router-link to="/scrollView">scrollView</router-link>
    </div>
    <router-view />
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
html,
body,
#app {
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  max-width: 200px;
  a {
    font-weight: bold;
    color: #2c3e50;
    display: block;
    text-align: left;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@font-face {
  font-weight: 400;
  font-family: vant-icon;
  font-style: normal;
  font-display: auto;
  src: url(https://img.yzcdn.cn/vant/vant-icon-eeb192.woff2) format("woff2"),
    url(https://img.yzcdn.cn/vant/vant-icon-eeb192.woff) format("woff"),
    url(https://img.yzcdn.cn/vant/vant-icon-eeb192.ttf) format("truetype");
}
</style>
