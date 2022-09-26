<template>
  <div class="bg-light">
    <div class="d-flex justify-content-center align-items-center w-50 h-100 vh-100 container">
      <div class="row">
        <div class="col-12 text-center mb-5">
          <p class="h1 text-secondary">TODO LIST</p>
        </div>
        <div class="col-12 justify-content-center align-items-center d-flex p-5 bg-white border border-primary">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(submitForm)">
              <validation-provider rules="required" v-slot="{ errors }">
                <h4 class="my-4">Login</h4>
                <input type="text" v-model="state.username" placeholder="Username" class="form-control">
                <p class="error-msg text-danger">{{ errors[0] }}</p>
              </validation-provider>
              <validation-provider rules="required" v-slot="{ errors }">
                <input type="password" v-model="state.password" placeholder="Password" class="form-control">
                <p class="error-msg text-danger">{{ errors[0] }}</p>
                <input type="submit" value="Login" class="btn btn-primary btn-block mb-4">
              </validation-provider>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required !",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const state = {
      username: "",
      password: "",
    };
    return { state };
  },
  methods: {
    async submitForm() {
      try {
        const formData = {
          username: this.state.username,
          password: this.state.password,
        };
        const TOKEN = await axios.post('/api/token/', formData);
        localStorage.setItem('user-token', TOKEN.data.access);
        localStorage.setItem('username', this.state.username);
        this.$store.dispatch('userToken', localStorage.getItem('user-token'));
        this.$router.push('/').catch(() => { });
      } catch (error) {
        this.$toastr.defaultPosition = "toast-top-right";
        this.$toastr.e("Incorrect username or password !!!");
        console.error(error);
        return;
      }
    },
  },
  computed: {
    ...mapGetters(['userToken']),
  },
};
</script>
