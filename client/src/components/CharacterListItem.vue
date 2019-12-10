<template>
  <article class="message">
    <div class="message-header">
      <h2 class="is-size-5">{{ character.name }}</h2>
    </div>
    <div class="message-body">
      <p class="is-size-6">Class: {{ character.class }}</p> 
      <p class="is-size-6">Level: {{ character.level }}</p> 
      <p class="is-size-6">League: {{ character.league }}</p> 
    </div>
    <form v-on:submit.prevent="characterView">
            <div class="field">
                <input type="submit" value="View Character Details" class="button is-small is-info"/>
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