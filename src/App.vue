<template>
  <div id="app">
    <Nav/>
    <div class="router_home">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Nav from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Nav,
    Footer
  },
  name: "app"
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router_home {
  margin-top: 60px;
}
</style>
