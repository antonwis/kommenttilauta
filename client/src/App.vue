<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from './components/Header';
export default {
  name: 'app',
  computed: {
    
  },
  
  components: {
    Header
  }
};
</script>

<style scoped>

</style>
