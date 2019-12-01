<template>
    <section>
        <div v-if="loading">
            <h3>Loading...</h3>
        </div>

        <div v-if="error">
            <h1>{{error}}</h1>
            <router-link to="/">Go Back</router-link>
        </div>

        <div v-if="profileData" class="container">
            
            <h3>{{profileData.id}}</h3>
            <p>{{profileData.description}}</p>

        </div>
    </section>
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
                `/api/profile/${this.$route.params.league}`
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