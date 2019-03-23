<template>
  <footer class="pa-3">
    <div class="foot">&copy; {{ date }} {{ company }}</div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 1px solid rgba(152, 166, 173, 0.2);
  bottom: 0px;
  color: #ffffff;
  text-align: right !important;
  padding: 19px 30px 20px;
  position: absolute;
  right: 0px;
  left: 250px;
}
</style>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
      company: "Miracle Anyanwu."
    };
  }
};
</script>
