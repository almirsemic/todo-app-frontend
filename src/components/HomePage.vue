<template>
  <div>
    <div class="d-flex justify-content-center mt-5">
      What's up<h5 class="text-uppercase ms-2">{{ username }}</h5>
      <div class="position-absolute top-0 end-0 mt-2 mx-2">
        <b-dropdown id="dropdown-right" right text="Profile" variant="primary" class="m-2">
          <b-dropdown-item href="/change/password">Change Password</b-dropdown-item>
          <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="container mt-5 border border-1 w-50 ">
      <section>
        <div class="d-flex justify-content-center">
          <div class=" mt-5">
            <h3 class="text-success">CRAEATE A TODO LIST</h3>
            <div>
              What's on your todo list
              <b-button v-b-modal.modal-1 class="btn btn-success" @click="clearValue()">Add</b-button>
            </div>
          </div>
        </div>
        <hr>
        <div class="mt-5">
          <div v-for="todo in todoDetails" :key="todo.id"
            class="list-group-item d-flex row align-items-center justify-content-between border border-1 mb-2 rounded py-2 bg-light">
            <div class="col-7">
              <p class="mt-2 text-success">{{todo.description}}</p>
            </div>
            <div class="col-5">
              <div class="d-flex">
                <b-form-select v-model="todo.state" :options="options" class="form-select" id="mi"
                  @change="updateOnSelect($event, todo)"></b-form-select>
                <svg v-b-modal.modal-2 @click="updateTodo(todo.name, todo.description, todo.state, todo.id)"
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil offset-1 mt-2" viewBox="0 0 16 16">
                  <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                <svg v-b-modal.modal-3 @click="confirmDelete(todo.id)" xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" fill="currentColor" class="bi bi-trash3 offset-1 mt-2" viewBox="0 0 16 16">
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </div>
            </div>
          </div>
          <div v-if="todoDetails.length == 0" class="text-center text-danger">You todo list is empty please add
            something.</div>
        </div>
      </section>
    </div>
    <b-modal id="modal-1" title="What's on your todo list ?" @ok="createTodo()">
      <label class="mt-4">Name</label>
      <input type="text" class="form-control" v-model="name">
      <label class="mt-4">Description</label>
      <input type="text" class="form-control" v-model="description">
      <label class="mt-4">Select status</label>
      <b-form-select v-model="selected" :options="options" class="form-select"></b-form-select>
    </b-modal>
    <b-modal id="modal-2" title="Update" @ok="update()">
      <label class="mt-4">Name</label>
      <input type="text" class="form-control" v-model="name">
      <label class="mt-4">Description</label>
      <input type="text" class="form-control" v-model="description">
      <label class="mt-4">Select status</label>
      <b-form-select v-model="selected" :options="options" class="form-select"></b-form-select>
    </b-modal>
    <b-modal id="modal-3" title="Delete" @ok="deleteTodo()">
      <p class="my-4">Are you sure you want to delete this post?</p>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      selected: null,
      name: '',
      description: '',
      id: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: "Todo", text: "Todo" },
        { value: "In Progress", text: "In Progress" },
        { value: "In Review", text: "In Review" },
        { value: "Done", text: "Done" }
      ],
      todoDetails: []
    };
  },
  async created() {
    const TODO = await axios.get('/todo/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
    })
    for (let i in TODO.data.results) {
      if (TODO.data.results[i].author == localStorage.getItem('username')) {
        this.todoDetails.push(TODO.data.results[i])
      }
    }
  },
  methods: {
    updateOnSelect(select, todo) {
      const article = {
        name: todo.name,
        description: todo.description,
        state: select
      }
      const headers = { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
      axios.put(`/todo/${todo.id}/`, article, { headers })
        .then((res) => {
          this.todoDetails = this.todoDetails.map(obj => res.data.id == obj.id ? res.data : obj);
        })
      this.$toastr.defaultPosition = "toast-top-right";
      this.$toastr.s("You have successfully updated your task!");
    },
    clearValue() {
      this.name = ''
      this.description = ''
      this.selected = null
    },
    update() {
      const article = {
        name: this.name,
        description: this.description,
        state: this.selected
      }
      const headers = { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
      axios.put(`/todo/${this.id}/`, article, { headers })
        .then((res) => {
          this.todoDetails = this.todoDetails.map(obj => res.data.id == obj.id ? res.data : obj);
        })
      this.$toastr.defaultPosition = "toast-top-right";
      this.$toastr.s("You have successfully updated your task!");
    },
    updateTodo(name, description, selected, id) {
      this.name = name
      this.description = description
      this.selected = selected
      this.id = id
    },
    confirmDelete(id) {
      this.id = id
    },
    deleteTodo() {
      axios.delete(`/todo/${this.id}/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` },
          data: {
            id: this.id
          }
        })
      for (let i in this.todoDetails) {
        if (this.todoDetails[i].id == this.id) {
          if (i > -1) {
            this.todoDetails.splice(i, 1);
          }
        }
      }
      this.$toastr.defaultPosition = "toast-top-right";
      this.$toastr.e("Successfully deleted post !!!!");
    },
    createTodo() {
      if (this.selected && this.name && this.description) {
        axios.post('/todo/',
          {
            description: this.description,
            state: this.selected,
            name: this.name,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
          }).then((res) => {
            this.todoDetails.push(res.data)
          })
        this.$toastr.defaultPosition = "toast-top-right";
        this.$toastr.s("You have successfully added a todo!");
        this.selected = null;
        this.name = '';
        this.description = ''
      } else {
        this.$toastr.defaultPosition = "toast-top-right";
        this.$toastr.e("Fill in all fields please!");
      }
    },
    logout() {
      this.$store.dispatch("userToken", null);
      localStorage.clear();
      this.$router.push("/login").catch(() => { });
    },
  },
  computed: {
    ...mapGetters(["userToken"]),
  },
};
</script>
