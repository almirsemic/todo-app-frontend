<template>
    <section class="vh-100 bg-light">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <form @submit.prevent="changePassword()">
                                <h3 class="mb-5">Change Password</h3>
                                <div class="form-outline mb-4">
                                    <input type="password" class="form-control form-control-lg" v-model="oldPassword" />
                                    <label class="form-label">Old Password</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="password" class="form-control form-control-lg" v-model="newPassword" />
                                    <label class="form-label">New Password</label>
                                </div>
                                <button class="btn btn-primary btn-lg btn-block px-2" type="submit">Change
                                    Password</button>
                            </form>
                            <router-link to="/"><button
                                    class="btn btn-light btn-lg btn-block border border-1 my-1 px-4">Back to
                                    Home</button></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            oldPassword: '',
            newPassword: '',
        }
    },
    methods: {
        async changePassword() {
            try {
                const article = {
                    old_password: this.oldPassword,
                    new_password: this.newPassword
                }
                const headers = { Authorization: `Bearer ${localStorage.getItem('user-token')}` }
                await axios.put(`/api/change-password/`, article, { headers })
                    .then((res) => {
                        if (res.data.code == 200) {
                            this.$toastr.defaultPosition = "toast-top-right";
                            this.$toastr.s(res.data.message);
                            this.$store.dispatch("userToken", null);
                            localStorage.clear();
                            this.$router.push("/login").catch(() => { });
                        }
                    })
            } catch (error) {
                this.$toastr.defaultPosition = "toast-top-right";
                this.$toastr.e("Wrong password, please try again!");
                console.error(error)
                return
            }
        }
    },
    computed: {
        ...mapGetters(["userToken"]),
    }
}
</script>