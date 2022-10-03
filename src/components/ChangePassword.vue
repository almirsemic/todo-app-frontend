<template>
    <section class="vh-100 bg-light">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(changePassword)">
                                    <h3 class="mb-5">Change Password</h3>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label class="form-label">Old Password</label>
                                            <input type="password" class="form-control form-control-lg"
                                                v-model="oldPassword" />
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label class="form-label">New Password</label>
                                            <input type="password" class="form-control form-control-lg"
                                                v-model="newPassword" />
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label class="form-label">Confirm Password</label>
                                            <input type="password" class="form-control form-control-lg"
                                                v-model="confirmPassword" />
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div>
                                    <button class="btn btn-primary btn-lg btn-block px-2" type="submit">Change
                                        Password</button>
                                </form>
                            </ValidationObserver>
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
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        async changePassword() {
            if (this.newPassword === this.confirmPassword) {
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
                    this.$toastr.e("You entered the wrong old password, please try again!");
                    this.oldPassword = ''
                    console.error(error)
                    return
                }
            } else {
                this.$toastr.defaultPosition = "toast-top-right";
                this.$toastr.e("Passwords do not match, please try again!");
                this.newPassword = ''
                this.confirmPassword = ''
            }
        }
    },
    computed: {
        ...mapGetters(["userToken"]),
    }
}
</script>