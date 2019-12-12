<template>
    <section class="notification">

        <h1 class="title is-size-1">Path of Exile database</h1>

        <h1 class="subtitle is-size-4">Search for accounts, characters and leagues</h1>
        <form v-on:submit.prevent="charList">
            <label class="label" for="account">Account</label>
            <div class="field is-grouped">
                <input class="input" type="textarea" name="text" v-model="account" id="account" placeholder="Search for accounts" />
                <input class="button is-dark" type="submit" value="Search"/>
            </div>
        </form>


        <form v-on:submit.prevent="onSubmit">
            <label class="label" for="league">League</label>
            <div class="field is-grouped">
                <input class="input" type="textarea" name="text" v-model="league" id="league" placeholder="Search for leagues" />
                <input class="button is-dark" type="submit" value="Search"/>
            </div>
            <div class="field">
                <router-link to="/poe/leagues/">
            <input class="button is-dark" type="submit" value="View all leagues"/></router-link>
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