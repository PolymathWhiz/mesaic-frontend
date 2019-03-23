<template>
  <div class="container">
    <!-- Shows if there are no students -->
    <template v-if="!studentAvaliable">
      <h1 class="text-danger">Students are not avaliable</h1>
    </template>
    <!-- Shows if there are students added -->
    <template v-else>
      <h1>There is students</h1>
    </template>
  </div>
</template>

<style scoped>
</style>


<script>
export default {
  data() {
    return {
      studentAvaliable: false
    };
  },
  methods: {},
  created() {}
};
</script>
