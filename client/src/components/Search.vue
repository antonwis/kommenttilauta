<template>
    <section class="search">
        <h1>Search for leagues</h1>
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="league">League</label>
                <input type="textarea" name="text" v-model="league" id="league" placeholder="Search for a league eg. Blight" />
            </div>
            <div class="form-group">
                <input type="submit" value="Submit" class="btn" />
            </div>
             <div class="form-group">
            <router-link to="/leagues">
            <input type="submit" value="View all leagues" class="btn" /></router-link>
             </div>
        </form>
    </section>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            league: ""
        };
    },
    beforeCreate() {
        document.body.className = "body-bg-image";
    },
    methods: {
        onSubmit() {
            if (!this.league) {
                console.log("Enter league name");
            } else {
                this.$router.push(`/poe/${this.league}`);
            }

        }
    }
}
</script>

<style scoped>


</style>