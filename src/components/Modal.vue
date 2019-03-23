<template>
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
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action>
            <div class="form-group">
              <label for>First Name</label>
              <input type="text" class="form-control" v-model="first_name" placeholder="First Name">
            </div>
            <div class="form-group">
              <label for>First Name</label>
              <input type="text" class="form-control" v-model="last_name" placeholder="Last Name">
            </div>
            <div class="form-group">
              <label for>Hobbies</label>
              <input type="text" class="form-control" v-model="hobbies" placeholder="Hobbies">
            </div>
            <div class="form-group">
              <label for>Birth Date</label>
              <input
                type="date"
                class="form-control"
                v-model="birth_date"
                placeholder="Date of Birth"
              >
            </div>
            <div class="form-group">
              <label for>Photo</label>
              <input type="file" class="form-control" placeholder="Photo">
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
</template>

<style>
</style>

<script>
export default {
  data() {
    return {};
  }
};
</script>
