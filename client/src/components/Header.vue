<template>
    <header class="header">
        <h1>Forum</h1>
        <div id="nav">
            <router-link to="/forum">Forum</router-link> |
            <router-link to="/search">POE Search</router-link> |
            <router-link to="/login" v-if="!loggedIn">Login</router-link>
            <router-link to="/login" v-if="loggedIn">Logout</router-link>

        </div>
    </header>

</template>

<script>

    export default {
        name: "Header",
        components: {

        },
        data() {
            return{
                loggedIn: false
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
