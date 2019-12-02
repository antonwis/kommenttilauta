<template>
  <article class="message">
    <div class="message-header">
      <p>{{ post.title }}</p>
 
      <button @click="deletePost" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      {{ post.body }}
      <br>
      <br>
      <span class="has-text-grey-light">Created at: {{ post.createdAt | moment }}</span>
      <br>
      <span class="has-text-grey-light">last updated: {{ post.updatedAt | moment }}</span><br>
      <UpdatePostModule :post="post" @updatePost="updatePost" :key="post._id"/>
    </div>
  </article>
</template>
<script>
  import { deletePost } from '../repository'
  import UpdatePostModule from './UpdatePostModule'
  import Moment from 'moment'
 
  export default {
    name: 'PostItem',
    props: [ 'post' ],
    components: { UpdatePostModule },
    methods: {
      deletePost(e){
        e.preventDefault();
        deletePost(this.post._id)
          .then(() => this.$emit('deletePost', this.post._id))
          .catch(err => console.log(err))
      },
      updatePost(post){
        this.$emit('updatePost', post)
      }
    },
    filters: {
      moment(date) {
        return Moment(date).format('MMMM Do YYYY, h:mm:ss a');
      }
    }
  }
</script>