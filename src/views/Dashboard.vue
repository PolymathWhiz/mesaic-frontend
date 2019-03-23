<template>
  <div class="container">
    <!-- Shows if there are no students -->
    <template v-if="!studentAvaliable">
      <h1 class="text-danger">Students are not avaliable</h1>
    </template>
    <!-- Shows if there are students added -->
    <template v-else>
      <div class="row" style="margin-bottom: 50px; !important">
        <div class="col-lg-4" v-for="(item, index) in cardData" :key="item.id">
          <div class="card">
            <div class="card-body text-center">
              <div class="profile-pic m-b-20 m-t-20">
                <img :src="cardData.avatar" width="200px" height="200px" alt="user">
                <h4
                  class="m-t-20 m-b-0"
                  style="margin-top: 20px; margin-bottom: 20px;"
                >{{ item.first_name }} {{ item.last_name }}</h4>
                <a href="#">{{ item.email }}</a>
              </div>
              <div style="badge badge-pill badge-success text-white font-16; margin-top: 15px;">
                <button class="btn btn-success btn-block" @click="unblock(item.id, index)">Unblock</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
</style>


<script>
export default {
  data() {
    return {
      studentAvaliable: true
    };
  },
  methods: {},
  created() {}
};
</script>
