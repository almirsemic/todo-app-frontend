<template>
  <div class="d-flex justify-content-center mt-5">
    <h5>Hello {{ username }}</h5>
    <br />
    <button @click="Logout()"  type="button" class="btn btn-danger ms-5">Logout</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
    };
  },
  methods: {
    Logout() {
      this.$store.dispatch("userToken", null);
      localStorage.clear();
      this.$router.push("/login").catch(() => {});
    },
  },
  computed: {
    ...mapGetters(["userToken"]),
  },
};
</script>
