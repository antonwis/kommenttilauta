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

  </article>
</template>

<script>
  export default {
    name: 'CharacterListItem',
    props: [ 'character' ],
    }
</script>

<style scoped>

</style>