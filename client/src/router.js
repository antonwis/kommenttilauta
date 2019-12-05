import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search.vue';
import Profile from './components/Profile.vue';
import Forum from "./components/Forum.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'forum',
            component: Forum
        },
        {
            path: "/search",
            name: "search",
            component: Search
        },
        {
            path: '/poe/:league',
            name: 'poe',
            component: Profile
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        }
    ]
});