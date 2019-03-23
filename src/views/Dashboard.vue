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
            <form @submit.stop.prevent="addStudent">
              <div class="form-group">
                <label for="photo">Photo</label>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  class="form-control"
                  ref="photo"
                  v-on:change="handleFileUpload()"
                  placeholder="Photo"
                  required
                >
              </div>
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.first_name"
                  placeholder="First Name"
                  required
                >
              </div>
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.last_name"
                  placeholder="Last Name"
                  required
                >
              </div>
              <div class="form-group">
                <label for="hobbies">Hobbies</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.hobbies"
                  placeholder="Hobbies"
                  required
                >
              </div>
              <div class="form-group">
                <label for="birth_date">Birth Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="form.birth_date"
                  placeholder="Date of Birth"
                  required
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="handleOk">Save</button>
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
          return this.$toasted.show(message, {
            type: "error"
          });
        }
      }
    },
    async addStudent() {
      try {
        this.form.birth_date = this.normalizeBirthDate(this.form.birth_date);

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
          return this.$toasted.show(message, {
            type: "error"
          });
        }
      }
    },
    async destroyStudent(id) {
      try {
        await this.$http.delete(`/${id}`);
        this.$store.commit("deleteFromStudentList", id);

        this.$toasted.show("Successfully deleted student", {
          type: "success"
        });

        return this.fetchStudents();
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          return this.$toasted.show(message, {
            type: "error"
          });
        }
      }
    },
    async editStudent(id) {
      try {
        this.form.birth_date = this.normalizeBirthDate(this.form.birth_date);

        let formData = new FormData();
        formData.append("first_name", this.form.first_name);
        formData.append("last_name", this.form.last_name);
        formData.append("birth_date", this.form.birth_date);
        formData.append("hobbies", this.form.hobbies);
        formData.append("photo", this.form.photo);

        const response = await this.$http.post(`/${id}`, formData);
        this.$toasted.show(response.data.message, {
          type: "success"
        });
        return;
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          return this.$toasted.show(message, {
            type: "error"
          });
        }
      }
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.form.photo) {
        this.$toasted.show("Please select a photo", {
          type: "error"
        });
      } else if (this.form.first_name === "") {
        this.$toasted.show("Enter a first name", {
          type: "error"
        });
      } else if (this.form.last_name === "") {
        this.$toasted.show("Enter a last name", {
          type: "error"
        });
      } else if (!this.form.birth_date) {
        this.$toasted.show("Select a birth date", {
          type: "error"
        });
      } else if (!this.form.hobbies) {
        this.$toasted.show("Input some hobbies", {
          type: "error"
        });
      } else if (!this.checkDateValidity(this.form.birth_date)) {
        this.$toasted.show("You cannot select a date in the future", {
          type: "error"
        });
      } else {
        // everything is good, add student
        this.addStudent();
      }
    },
    handleFileUpload() {
      this.form.photo = this.$refs.photo.files[0];
    },
    normalizeBirthDate(date) {
      // split it by /
      // select the individual indexes
      // concatenate it
      let parts = date.split("/");
      let month = parseInt(parts[0], 10);
      let day = parseInt(parts[1], 10);
      let year = parseInt(parts[2], 10);

      const newDate = `${month}-${day}-${year}`;

      return newDate;
    },
    checkDateValidity(date) {
      const enteredDate = new Date(date);
      const today = new Date();
      if (enteredDate > today) {
        return false;
      }
      return true;
    }
  },
  created() {
    this.fetchStudents();
    this.validateStudentCount();
  }
};
</script>
