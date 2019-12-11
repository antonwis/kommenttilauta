<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          Create a new post
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input v-model="title" class="input" type="text" placeholder="Title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="body" class="textarea"  placeholder="Enter content">
                </textarea>
            </div>
          </div>
          <button @click="create" class="button is-primary is-pulled-right">Publish</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button v-if="isLoggedIn" @click="toggle" class="button is-success is-large">New Post</button>
  </div>
</template>
 
<script>
import { createPost }  from '../repository'
import { mapGetters } from 'vuex'
export default {
  name: 'CreatePostModule',
  data(){
    return {
      title: '',
      body: '',
      isActive: false
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn', 
    ])
  },
  methods: {
    create(){
      const data = { title: this.title, body: this.body }
      createPost(data)
        .then(data => {
          this.$emit('createPost', data.post);
          this.title = '';
          this.body = '';
          this.toggle();
        })
        .catch(err => console.log(err.message));
    },
    toggle(){
      this.isActive = !this.isActive;
    },
  }
}
</script>

<style scoped>

</style>