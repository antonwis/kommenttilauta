<template>
  <div class="login-overlay">
    <div class="login-wrapper border border-light">
      <form class="form-signin" @submit.prevent="log">
        <h2 class="form-signin-heading">Please sign in</h2>
        <div class="alert alert-danger" v-if="error">Invalid credentials</div>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <router-link to="/register">Register</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { login } from '../repository'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      
    }
  },
  
  computed: {
    ...mapGetters([
        'error'
            
            
        ])
        },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      
    },
    log(){
      const info = {email: this.email, password: this.password}
      login(info);
    }
  },
 
}

</script>

<style scoped>

</style>