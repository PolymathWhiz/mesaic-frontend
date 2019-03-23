<template>
  <div class="container">
    <div class="add_btn">
      <button class="btn btn-success mr-auto">Add Student</button>
    </div>
    <!-- Shows if there are no students -->
    <template v-if="!studentAvaliable">
      <h1 class="text-danger">Students are not avaliable</h1>
    </template>
    <!-- Shows if there are students added -->
    <template v-else>
      <div class="row" style="margin-bottom: 50px; ">
        <div
          class="col-lg-4"
          style="margin-top: 25px;"
          v-for="(item, index) in cardData"
          :key="item.id"
        >
          <div class="card">
            <div class="card-body text-center">
              <div class="profile-pic m-b-20 m-t-20">
                <img
                  :src="item.photo_url"
                  width="80px"
                  height="80px"
                  alt="student photo"
                  class="rounded-circle"
                >
                <hr>
                <h5
                  class="m-t-20 m-b-0"
                  style="margin-top: 20px; margin-bottom: 20px;"
                >{{ item.first_name }} {{ item.last_name }}</h5>
                <p>
                  Hobbies:
                  <span class="hobbies_holder">{{ item.hobbies }}</span>
                </p>
                <p>
                  Born:
                  <span class="dob_holder">{{ new Date(item.birth_date).toDateString() }}</span>
                </p>
                <p>
                  Created:
                  <span class="dob_holder">{{ new Date(item.created_at).toDateString() }}</span>
                </p>
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
.add_btn {
  margin-bottom: 30px;
}

.hobbies_holder {
  color: #1d2037 !important;
}
</style>


<script>
export default {
  data() {
    return {
      studentAvaliable: true,
      cardData: this.$store.getters.students,
      form: {
        first_name: "",
        last_name: "",
        hobbies: "",
        photo: "",
        birth_date: ""
      }
    };
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await this.$http.get(`/`);
        const total = response.data.meta.total;

        for (let i = 0; i < total; i++) {
          this.$store.commit(
            "addToStudentList",
            response.data.data.students[i]
          );
        }

        return total === 0
          ? (this.studentAvaliable = false)
          : (this.studentAvaliable = true);
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          return alert(message);
        }
      }
    },
    async addStudent() {
      try {
        let formData = new FormData();
        formData.append("first_name", this.form.first_name);
        formData.append("last_name", this.form.last_name);
        formData.append("birth_date", this.form.birth_date);
        formData.append("hobbies", this.form.hobbies);
        formData.append("photo", this.form.photo);

        const response = await this.$http.post("/", formData);
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          return alert(message);
        }
      }
    }
  },
  created() {
    this.fetchStudents();
  }
};
</script>
