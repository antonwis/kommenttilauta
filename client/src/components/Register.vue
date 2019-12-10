 <template>
        <div class="register-overlay">
          <div class="register-wrapper border border-light">
          
          <form @submit.prevent="reg">
            <h2 class="form-register-heading">Register</h2>
            <div class="alert alert-danger" @loginError="error" v-if="error">{{ error }}</div>
            <label for="name">Name</label>
            <input v-model="name" id="name" class="form-control" type="text" placeholder="Name" required autofocus>
            <label for="email" >Email</label>
            <input v-model="email" id="email" class="form-control" type="text" placeholder="Email" required autofocus>
            <label for="password">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <label for="password-confirm">Confirm Password</label>
            <input v-model="password" type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirm Password" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            <router-link to="/login">Cancel</router-link>
              
            
          </form>
          </div>
        </div>
      </template>
      
      <script>
      import { mapGetters } from 'vuex'
      import {register} from '../repository'
      import repository from '../repository';
      export default {
        data() {
          return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          };
        }, 
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
            
         },
          reg: function() {
            let data = {
              name: this.name,
              email: this.email,
              password: this.password,
              
            };
            register(data);
          }
        }
      };
      </script>