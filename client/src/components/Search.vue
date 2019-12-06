<template>
    <section class="search">

        <h1>Search for leagues</h1>
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="league">League</label>
                <input type="textarea" name="text" v-model="league" id="league" placeholder="Search for leagues" />
            </div>
            <div class="form-group">
                <input type="submit" value="Submit" class="btn" />
            </div>

             <div class="form-group">
            <router-link to="/poe/leagues/">
            <input type="submit" value="View all leagues" class="btn" /></router-link>
             </div>

        </form>
        
        <h1>Search for account</h1>
        <form v-on:submit.prevent="charList">
            <div class="form-group">
                <label for="account">Account</label>
                <input type="textarea" name="text" v-model="account" id="account" placeholder="Search for accounts" />
            </div>
            <div class="form-group">
                <input type="submit" value="Submit" class="btn" />
            </div>
        </form>

    </section>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            league: "",
            account: ""
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
                this.$router.push(`/poe/leagues/${this.league}`);
            }
        },
       charList() {
            if (!this.account) {
                console.log("Enter account name");
            } else {
                this.$router.push(`/poe/account/${this.account}`);
            }
        }
    }
}
</script>

<style scoped>


</style>