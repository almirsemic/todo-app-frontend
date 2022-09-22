<template>
  <div class="body">
    <input type="radio" name="a1" id="chk1" style="display: none" />
    <input type="radio" name="a1" id="chk2" style="display: none" />
    <div class="box">
      <div class="a">
        <h6 class="title mt-5">TODO LIST</h6>
        <label for="chk1">Login</label>
        <label for="chk2" id="sup">Register</label>
      </div>
      <div class="b">
        <form action="" class="frm">
          <br /><br /><br />
          <h6 class="title">Register</h6>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Password Confirm" />
          <input type="button" value="Sign up" id="btn" />
          <label for="chk1" id="btm">Login Here</label>
        </form>
      </div>
      <div class="c">
        <form action="" @submit.prevent="submitForm" class="frm">
          <br /><br /><br /><br />
          <h6 class="title">Login</h6>
          <validation-provider rules="required" v-slot="{ errors }">
            <input
              v-model="state.username"
              name="username"
              type="text"
              placeholder="Username"
            />
            <div class="error-msg">{{ errors[0] }}</div>
          </validation-provider>
          
          <input type="submit" value="Login" id="btn" />
          <label for="chk2" id="btm">Register Here</label>
        </form>
      </div>
      <div class="d"></div>
      <div class="e"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  setup() {
    const state = {
      username: '',
      password: '',
    };
    return { state};
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
        this.$router.push('/').catch(() => {});
      } catch (error) {
        console.error(error);
        return;
      }
    },
  },
  components: {
    ValidationProvider
  },
  computed: {
    ...mapGetters(['userToken']),
  },
};
</script>
<style scoped>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: sans-serif;
  transition: 1s ease;
}
.body {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(231, 224, 224);
  position: absolute;
}
.box {
  position: absolute;
  width: 350px;
  height: 500px;
  background: none;
  left: calc(50% - 175px);
  top: calc(50% - 250px);
  transform-style: preserve-3d;
}
.box div {
  width: 350px;
  height: 500px;
  position: absolute;
  background-image: radial-gradient(#fff, rgb(231, 224, 224));
  box-shadow: 0px 0px 5px rgb(231, 224, 224), 0px 0px 30px rgb(231, 224, 224),
    inset 0px 0px 5px rgb(231, 224, 224), inset 0px 0px 30px rgb(231, 224, 224);
  border: 3px solid white;
}
.box div:nth-child(5) {
  height: 350px;
  box-shadow: 0px 0px 10px rgb(231, 224, 224), 0px 0px 30px rgb(231, 224, 224);
}
.a {
  transform: rotateY(0deg) translateZ(175px);
}
.b {
  transform: rotateY(90deg) translateZ(175px);
}
.c {
  transform: rotateY(180deg) translateZ(175px);
}
.d {
  transform: rotateY(270deg) translateZ(175px);
}
.e {
  transform: rotateX(-90deg) translateZ(325px);
}
.a label {
  position: relative;
  width: 200px;
  left: 72px;
  top: 170px;
  color: white;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  margin: 20px 0px;
  text-align: center;
  display: block;
  background-image: linear-gradient(45deg, #8000ff, #ff00c4);
  border-radius: 25px;
  box-shadow: 0px 0px 5px #ff44f8, 0px 0px 30px #ff44f8;
  cursor: pointer;
}
#sup,
#btn {
  background-image: linear-gradient(45deg, #ff00c4, #8000ff);
  color: white;
  cursor: pointer;
}
#btn:focus {
  width: calc(100% - 80px);
  left: 40px;
}
.title {
  width: 100%;
  text-align: center;
  line-height: 30px;
  font-size: 30px;
  font-weight: bold;
  color: #8d006c;
  text-shadow: 0px 0px 20px #ff00c4;
  position: absolute;
}
.frm input {
  position: relative;
  width: calc(100% - 80px);
  left: 40px;
  display: block;
  text-align: center;
  line-height: 40px;
  top: 60px;
  background: none;
  outline: none;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 0px 5px #ff44f8, 0px 0px 30px #ff44f8;
  margin: 20px 0px;
  font-size: 16px;
}
.frm input:focus {
  width: calc(100% -40px);
  left: 20px;
  background: #ffcbf9;
  box-shadow: 0px 0px 5px #000, 0px 0px 30px #c900b2;
}
#btm {
  position: absolute;
  bottom: 20px;
  font-size: 20px;
  color: #720058;
  text-align: center;
  width: 100%;
  cursor: pointer;
}
#chk1:checked ~ .box {
  transform: rotateY(-180deg);
}
#chk2:checked ~ .box {
  transform: rotateY(-89.99deg);
}
</style>
