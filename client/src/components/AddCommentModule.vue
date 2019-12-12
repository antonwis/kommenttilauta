<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          Add a comment
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input v-model="name" class="input" type="text" placeholder="Enter a name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="text" class="textarea"  placeholder="Type your comment">
                </textarea>
            </div>
          </div>
          <button @click="create" class="button is-primary is-pulled-right">Publish</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button @click="toggle" class="button is-info is-rounded is-small">Comment</button>
  </div>
</template>
 
<script>
import { addComment }  from '../repository'
export default {
  name: 'AddCommentModule',
  data(){
    return {
      text: '',
      name: '',
      isActive: false
    }
  },
  props: [ 'post' ],
  methods: {
    create(){
      const data = { name: this.name, text: this.text };
      addComment(this.post._id, data)
        .then(data => {
          this.$emit('addComment', data.comment);
          this.name = '';
          this.text = '';
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