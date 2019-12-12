<template>
  <div class="notification">
    <div class="field">
      <form class="form-signin" @submit.prevent="log">
        <h2 class="title is-size-4">Please sign in</h2>
        <div class="notification is-danger" v-if="error">Invalid credentials</div>
        <label for="inputEmail" class="label">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="input" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="label">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="input" placeholder="******" required>
        <div class="field is-grouped">
        <button class="button is-rounded is-success" type="submit">Sign in</button>
        <router-link class="button is-rounded is-info" to="/register">Register</router-link>
        </div>
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