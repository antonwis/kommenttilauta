 <template>
        <div class="notification">
          <div class="field">
          
          <form @submit.prevent="reg">
            <h2 class="title is-size-2">Register</h2>
            <div class="notification is-danger" @loginError="error" v-if="error">{{ error }}</div>
            <label class="label" for="name">Name</label>
            <input v-model="name" id="name" class="input" type="text" placeholder="Name" required autofocus>
            <label class="label" for="email" >Email</label>
            <input v-model="email" id="email" class="input" type="text" placeholder="Email" required autofocus>
            <label class="label" for="password">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="input" placeholder="Enter a password -- min. 6 characters" required>
            <label class="label" for="password-confirm">Confirm Password</label>
            <input v-model="password_confirmation" type="password" id="inputPasswordConfirm" class="input" placeholder="Confirm Password" required>
            <button class="button is-rounded is-primary" type="submit">Register</button>
            <router-link to="/login" class="button is-rounded is-danger">Go Back</router-link>
              
            
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
            if(this.password === this.password_confirmation) {
              register(data);
            } else {
              alert("Please check your password");
            }
          }
        }
      };
      </script>