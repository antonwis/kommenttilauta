import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search.vue';
import Profile from './components/Profile.vue';
import Forum from "./components/Forum";
import Login from "./components/Login";
import Register from "./components/Register";

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
            path: '/profile/:league',
            name: 'profile',
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