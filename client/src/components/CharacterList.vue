<template>
    <div class="container">
      <div v-if="characterList">
        <div>
          <CharacterListItem v-for="(character, index) in characterList" :character="character" :key="index"/>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import CharacterListItem from "./CharacterListItem.vue";
export default {
    name: "CharacterList",
    components: {CharacterListItem},
    data() {
        return {
            loading: false,
            error: null,
            characterList: []
        };
    },
    beforeCreate() {
        document.body.className = "body-bg-no-image";
    },
    async created() {
        this.loading = true;
        try {
            const res = await axios.get(
                `/api/poe/account/${this.$route.params.accountName}`
            );
            this.characterList = res.data;
            console.log(this.characterList);
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