import VueRouter from "vue-router";
import Vue from "vue";
import store from "./vuex" 
import LoginLoginLogin from "./components/LoginLoginLogin";
import HomePage from "./components/HomePage";
import ChangePassword from "./components/ChangePassword";

const routes = [
  {
    path: '/login',
	name: 'login',
	component: LoginLoginLogin,
	meta: { requiresNonAuthenticatedState: true }
  },
  {
    path: '/',
    name: 'home',
	component: HomePage,
	meta: {	requiresAuth: true }
  },
  {
	path: '/change/password',
	name: 'changePassword',
	component: ChangePassword,
	meta: {requiresAuth: true }
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresNonAuthenticatedState)) {
		if (store.getters.userToken) {
			next('/');
			return;
		}
	}
	next();
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!store.getters.userToken) {
			next('/login');
			return;
		}
		next();
	}
});


export default router;
