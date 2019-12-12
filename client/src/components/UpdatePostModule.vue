<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          Update Post
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input v-model="title" class="input" type="text" placeholder="title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="body" class="textarea"  placeholder="Enter content"></textarea>
            </div>
          </div>
          <button @click="update" class="button is-primary is-pulled-right">Post</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button @click="toggle" class="button is-warning is-rounded is-small">Edit</button>
  </div>
</template>
 
<script>
import { updatePost }  from '../repository'
export default {
  name: 'UpdatePostModule',
  data(){
    return {
      title: this.post.title,
      body: this.post.body,
      isActive: false
    }
  },
  props: ['post'],
  methods: {
    update(){
      let data = { title: this.title, body: this.body }
      updatePost(data, this.post._id)
        .then(data => {
          this.$emit('updatePost', data.post);
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
header {
  color: #000;
}
</style>