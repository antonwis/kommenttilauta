 <template>
        <div class="register-overlay">
          <div class="register-wrapper border border-light">
          
          <form @submit.prevent="register">
            <h2 class="form-register-heading">Register</h2>
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            
            <label for="username" >Username</label>
            <input id="username" class="form-control" type="text" placeholder="Username" required autofocus>
            <label for="password">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <label for="password-confirm">Confirm Password</label>
            <input v-model="password" type="passwordConfirm" id="inputPasswordConfirm" class="form-control" placeholder="Confirm Password" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            <router-link to="/login">Cancel</router-link>
              
            
          </form>
          </div>
        </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          };
        },
        methods: {
          register: function() {
            let data = {
              name: this.name,
              email: this.email,
              password: this.password,
            };
            
          }
        }
      };
      </script>