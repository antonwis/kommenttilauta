<template>
    <div class="container">
        <div class="notification" v-if="loading">
            <h3 class="title is-size-3">Loading...</h3>
        </div>

        <div class="notification" v-if="error">
            <h1 class="title is-size 3">{{error}}</h1>
            <router-link class="button is-info" to="/search">Go Back</router-link>
        </div>

        <div v-if="profileData" class="notification">
            <div class="message">
                <div class="message-header">
                    <h3 class="title is-size-3">{{profileData.id}}</h3>
                </div>
                <div class="message-body">            
                    <p class="is-size-5">{{profileData.description}}</p>
                </div>
                <router-link class="button is-info" to="/search">Go Back</router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Profile",
    data() {
        return {
            loading: false,
            error: null,
            profileData: null
        };
    },
    beforeCreate() {
        document.body.className = "body-bg-no-image";
    },
    async created() {
        this.loading = true;
        try {
            const res = await axios.get(
                `/api/poe/leagues/${this.$route.params.league}`
            );
            this.profileData = res.data;
            console.log(this.profileData);
            this.loading = false;
        } catch (err) {
            this.loading = false;
            this.error = err.response.data.message;
        }
    }
}
</script>

<style scoped>

</style>