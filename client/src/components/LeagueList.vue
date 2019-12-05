<template>
    <div class="container">
      <div v-if="leagueData">
        <div>
          <LeagueListItem v-for="(league, index) in leagueData" :league="league" :key="index"/>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import LeagueListItem from "./LeagueListItem.vue";
export default {
    name: "LeagueList",
    components: {LeagueListItem},
    data() {
        return {
            loading: false,
            error: null,
            leagueData: []
        };
    },
    beforeCreate() {
        document.body.className = "body-bg-no-image";
    },
    async created() {
        this.loading = true;
        try {
            const res = await axios.get(
                `/api/poe/list`
            );
            this.leagueData = res.data.data;
            console.log(this.leagueData);
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