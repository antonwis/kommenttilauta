<template>
    <nav class="navbar is-black">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item"><h1 class="is-size-2">Kommenttilauta</h1></router-link>
        </div>
        <div class="navbar-menu is-active">

            <div class="navbar-start">
                <h1 class="navbar-item is-size-4" v-if="isLoggedIn"><span class="is-size-5 has-text-grey">Logged in as:</span>{{ user }}</h1>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <router-link to="/" class="navbar-item"><h1 class="is-size-2">Home</h1></router-link>
                </div>
                <div class="navbar-item">
            <router-link to="/search" class="navbar-item"><h1 class="is-size-2">Search</h1></router-link>
            </div>
            <div class="navbar-item">
            <router-link v-if="!isLoggedIn" to="/login" class="navbar-item"><h1 class="is-size-2">Login</h1></router-link>
            </div>
            <div class="navbar-item">
            <router-link v-if="isLoggedIn" to="/" @click.native="logOut" class="navbar-item"><h1 class="is-size-2">Logout</h1></router-link>
            </div>
            </div>
        </div>
    </nav>
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
                location.reload();
            },
            getUser(){
                if(localStorage.getItem('user')){
                if(JSON.parse(localStorage.getItem('user')).name !== null){
                    this.user = JSON.parse(localStorage.getItem('user')).name;
                }else{
                    this.user = '';
                }
                }
                
            }
        }

    }
</script>

<style scoped>

</style>
