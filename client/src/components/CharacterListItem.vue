<template>
  <article class="message">
    <div class="message-header">
      <h2>{{ character.name }}</h2>
    </div>
    <div class="message-body">
      <p>Class: {{ character.class }}</p> 
      <p>Level: {{ character.level }}</p> 
      <p>League: {{ character.league }}</p> 
    </div>
    <form v-on:submit.prevent="characterView">
            <div class="form-group">
                <input type="submit" value="View Character Details" class="btn" />
            </div>
        </form>

  </article>
</template>

<script>
import axios from "axios";
  export default {
    name: 'CharacterListItem',
    props: [ 'character' ],
    methods: {
      characterView() {
         if (!this.character) {
                console.log("Invalid character data");
            } else {
                this.$router.push(`/poe/account/${this.$route.params.accountName}/${this.character.name}`);
            }
      }
    }
  }
</script>

<style scoped>

</style>