<template>
  <article class="message">
    <div class="message-header">
      <h2>{{ league.id }}</h2>
    </div>
    <div class="message-body">
      <p>{{ league.description }}</p> 
    </div>
    <div>
        <a v-bind:href=league.url target="_blank">Link to forum</a>
    </div>

  </article>
</template>

<script>
  export default {
    name: 'LeagueListItem',
    props: [ 'league' ],
    }
</script>

<style scoped>

</style>