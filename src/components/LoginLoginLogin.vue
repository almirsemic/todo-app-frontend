<template>
  <div>
    <section class="gradient-custom" style="background: #6a11cb; height: 100vh">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-start h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">LOGIN</h2>
                  <p class="text-white-50 mb-5">
                    Please enter your username and password!
                  </p>
                  <form
                    @submit.prevent="submitForm"
                    class="needs-validation"
                    novalidate
                  >
                    <div class="form-outline form-white mb-4">
                      <label class="form-label"
                        >Username</label
                      >
                      <div>
                        <input
                          type="text"
                          v-model="username"
                          class="form-control"
                          required
                        />
                        <div v-if="usernameError" style="color: red;">
                          {{ usernameError }}
                        </div>
                      </div>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <label class="form-label"
                        >Password</label
                      >
                      <div>
                        <input
                          type="password"
                          v-model="password"
                          class="form-control"
                          required
                        />
                        <div v-if="passwordError" style="color: red;">
                          {{ passwordError }}
                        </div>
                      </div>
                    </div>
                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
                <div>
                  <p class="mb-0">
                    Don't have an account?
                    <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      token: null,
      username: "",
      password: "",
      usernameError: '',
      passwordError: ''
    };
  },
  methods: {
    async submitForm() {
      try {    
        const formData = {
          username: this.username,
          password: this.password,
        };
        const TOKEN = await axios.post("/api/token/", formData);
        localStorage.setItem("user-token", TOKEN.data.access);
        this.token = localStorage.getItem("user-token");
        const USER = await axios.get("/users/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        localStorage.setItem("username", USER.data.results[0].username);
        this.$store.dispatch("userToken", this.token);
        this.$router.push("/").catch(() => {});
      } catch {
        this.usernameError = this.username == '' ? 'Please enter a username !' : 'Invalid username !';
        this.passwordError = this.password == '' ? 'Please enter a password !' : 'Invalid password !';
        return;
      }
    },
  },
  computed: {
    ...mapGetters(["userToken"]),
  },
};
</script>
