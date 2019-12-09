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
              <input v-model="title" class="input" type="text" placeholder="title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="body" class="textarea"  placeholder="enter content">
                </textarea>
            </div>
          </div>
          <button @click="create" class="button is-primary is-pulled-right">Post</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button @click="toggle" class="button is-primary is-pulled-right">Create New Post</button>
    <br>
  </div>
</template>
 
<script>
import { createPost }  from '../repository'
export default {
  name: 'CreatePostModule',
  data(){
    return {
      title: '',
      body: '',
      isActive: false
    }
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
  },
}
</script>

<style scoped>

</style>