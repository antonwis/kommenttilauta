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
:root {
  --primary-color: #f4f4f4;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--primary-color);
  font-family: Arial, Helvetica, sans-serif;
  color: #000000;
  line-height: 1.6;
}

a {
  color:#000000;
  text-decoration: none;
}

ul {
  list-style: none;
}



.container {
  max-width: 960px;
  margin: 1rem auto;
  overflow: auto;
  padding: 0 2rem;
}

.form-group {
  margin: 1rem 0;
}

.search {
  background: rgba(0, 0, 0, 0.5);
  border: 4px red solid;
  margin-top: 1rem;
  padding: 2rem;
}

input,
select,
textarea {
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid red;
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #000;
  padding: 0.4rem 1.3rem;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 1rem;
}

@media (max-width: 700px) {
  body {
    background: var(--primary-color);
  }
}

</style>
