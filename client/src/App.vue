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
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped>

</style>
