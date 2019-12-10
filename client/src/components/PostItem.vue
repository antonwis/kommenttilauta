<template>
  <article class="message">
    <div class="message-header">
      <p>{{ post.title }}</p>
 
      <button @click="addLike" class="like_button" aria-label="like">Like</button> 
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
    <div class="message-body">
      <div v-for="(comment, index) in comments" :comment="comment" :key="index">
        <h6 v-if="comment.name">{{ comment.name }}</h6>
        <p v-if="comment.text">{{ comment.text }}</p>
        <button @click="deleteComment(index)" class="delete" aria-label="delete"></button>
      </div>
      <AddCommentModule :post="post" @addComment="addComment" :key="post._id"/>
      
    </div>
  </article>
</template>
<script>
  import { deletePost, addComment, deleteComment, addLike } from '../repository'
  import UpdatePostModule from './UpdatePostModule'
  import AddCommentModule from './AddCommentModule'
  import Moment from 'moment'
 
  export default {
    name: 'PostItem',
    props: [ 'post' ],
    components: { UpdatePostModule, AddCommentModule },
    data(){
      return {
        comments: []
      }
    },
    methods: {
      deletePost(e){
        e.preventDefault();
        deletePost(this.post._id)
          .then(() => this.$emit('deletePost', this.post._id))
          .catch(err => console.log(err))
      },
      deleteComment(index){
        const i = index;
         deleteComment(this.post._id, this.comments[i]._id)
           .then(() => this.$emit('deleteComment', this.comments._id))
           .catch(err => console.log(err));
      },
      updatePost(post){
        this.$emit('updatePost', post)
      },
      addComment(comment) {
        this.comments.concat(comment);
        location.reload();
      },
      addLike(e) {
        e.preventDefault();
        addLike(this.post._id)
          .catch(err => console.log(err))
      }
    },
    filters: {
      moment(date) {
        return Moment(date).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
    mounted() {
      this.comments = this.post.comments;
    }
  }
</script>