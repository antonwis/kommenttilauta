<template>
    <header class="header">
        <h1>Forum</h1>
        <div id="nav">
            <router-link to="/">Forum</router-link> |
            <router-link to="/search">POE Search</router-link> |
            <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
            <router-link v-if="isLoggedIn" to="/" @click.native="logOut">Logout</router-link>
            <h2 v-if="isLoggedIn">{{ user }}</h2>
        </div>
    </header>

</template>

<script>
import {mapGetters} from 'vuex'
import store from '../store/auth'
import {logout} from '../repository'
    export default {
        name: "Header",
        data(){
            return{
                user: ''
                
            } 
        },
        computed: {
            ...mapGetters([
            'isLoggedIn',
            
            
            ])
        },
        created() {
            this.getUser()
        },
        updated() {
            this.getUser()
        },
        methods: {
            logOut(){
                logout()
            },
            getUser(){
                if(JSON.parse(localStorage.getItem('user')).name !== null){
                    this.user = JSON.parse(localStorage.getItem('user')).name;
                }else{
                    this.user = '';
                }
                
            }
        }

    }
</script>

<style scoped>


    .header {
        background: #333;
        color: #fff;
        text-align: center;
        padding: 10px;
    }
    .header a {
        color: #fff;
        padding-right: 5px;
        text-decoration: none;
    }
</style>
