<template>
    <section class="vh-100 bg-light">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(updateProfile)">
                                    <h3 class="mb-5">Update Profile</h3>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label class="form-label">First Name</label>
                                            <input type="text" class="form-control form-control-lg"
                                                v-model="firstName" />
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label class="form-label">Last Name</label>
                                            <input type="text" class="form-control form-control-lg"
                                                v-model="lastName" />
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control form-control-lg"
                                                v-model="email" />
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <label for="avatar">Choose a profile picture:</label>
                                            <input type="file" class="mt-4">
                                            <p class="error-msg text-danger">{{ errors[0] }}</p>
                                        </validation-provider>
                                    </div> 
                                    <button class="btn btn-primary btn-lg btn-block px-2 mt-4" type="submit">Save</button>
                                    <router-link to="/"><button
                                            class="btn btn-light btn-lg btn-block border border-1 mx-1 mt-4 px-4">Back to
                                            Home</button></router-link>
                                </form>
                            </ValidationObserver>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
//import axios from "axios"
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
            firstName: '',
            lastName: '',
            email: ''
        }
    },
    methods: {
        updateProfile() {
            console.log("Hi")
        }
    },
    computed: {
        ...mapGetters(["userToken"]),
    }
}
</script>

