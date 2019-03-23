<template>
  <div class="container">
    <div class="add_btn" style="display: flex ; justify-content: center;">
      <button class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Add Student</button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Student</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action>
              <div class="form-group">
                <label for>First Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="first_name"
                  placeholder="First Name"
                  required
                >
              </div>
              <div class="form-group">
                <label for>First Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="last_name"
                  placeholder="Last Name"
                  required
                >
              </div>
              <div class="form-group">
                <label for>Hobbies</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="hobbies"
                  placeholder="Hobbies"
                  required
                >
              </div>
              <div class="form-group">
                <label for>Birth Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="birth_date"
                  placeholder="Date of Birth"
                  required
                >
              </div>
              <div class="form-group">
                <label for>Photo</label>
                <input type="file" class="form-control" placeholder="Photo" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Shows if there are no students -->
    <template v-if="!studentAvaliable">
      <h2 class="text-danger text-center" style="margin-top: 50px;">Student list is empty</h2>
    </template>
    <!-- Shows if there are students added -->
    <template v-else style="margin-bottom: 20px;">
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
              <hr>
              <div style="badge badge-pill badge-success text-white font-16; margin-top: 15px;">
                <button class="btn btn-primary btn-sm" @click="unblock(item.id, index)">Edit</button>
                <button
                  class="btn btn-danger btn-sm"
                  style="margin-left: 20px;"
                  @click="destroyStudent(item.id)"
                >Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <Footer></Footer>
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
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Footer
  },
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

        await this.$http.post("/", formData);

        return;
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          return alert(message);
        }
      }
    },
    async destroyStudent(id) {
      try {
        await this.$http.delete(`/${id}`);
        this.$store.commit("deleteFromStudentList", id);

        alert("Successfully deleted student");

        this.fetchStudents();
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          return alert(message);
        }
      }
    }
  },
  computed: {
    studentCount: function() {
      this.$store.getters.studentSize;
    }
  },

  created() {
    this.fetchStudents();
    this.validateStudentCount();
  }
};
</script>
