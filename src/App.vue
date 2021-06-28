<template>
  <div id="app">
    <ul id="menu">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/table">Table Sample</router-link></li>
      <li><router-link to="/checkbox">CheckBox Sample</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
}
#menu {
  border-bottom: solid 1px #ddd;
  display: flex;
  margin: 0;
  padding: 0 0 20px 0;
  li {
    list-style: none;
    margin: 0;
    a {
      margin: 0 10px;
    }
    &:before {
      content: "|";
    }
    &:first-child {
      &:before {
        content: "";
      }
    }
  }
}
</style>
