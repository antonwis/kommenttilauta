<template>
  <article class="message">
    <div class="message-header">
      <h3 class="is-size-3">{{ post.title }}</h3>
      <p class="is-size-7">Likes: {{ post.likes.length }}</p>
      <div class="field is-grouped">
      <div v-if="isLoggedIn">
      <button @click="addLike" v-if="!checkIfLiked()" class="button is-success is-rounded is-small" aria-label="like">Like</button>
      <button @click="removeLike" v-else class="button is-danger is-rounded is-small" aria-label="unlike">Unlike</button>
      </div>
      <div><AddCommentModule :post="post" @addComment="addComment" :key="post._id"/></div> <!-- Extra div to prevent false warning for duplicate keys -->
      <UpdatePostModule v-if="post.user == checkUser.id" :post="post" @updatePost="updatePost" :key="post._id"/>
      <button @click="deletePost" v-if="post.user == checkUser.id" class="button is-danger is-rounded is-small" aria-label="delete">Delete</button>
      </div>
    </div>
    <div class="message-body">
      {{ post.body }}
      <div class="content">
      <span class="has-text-grey-light is-size-7">Created at: {{ post.createdAt | moment }}</span><br>
      <span class="has-text-grey-light is-size-7">last updated: {{ post.updatedAt | moment }}</span>
      </div> 
    </div>

    <div class="message-body">
      <div class="notification is-light" v-for="(comment, index) in comments" :comment="comment" :key="index">
        <h6 class="title is-5" v-if="comment.name">{{ comment.name }} <span class="has-text-grey-light is-size-7">commented:</span></h6>
        <p class="is-size-6" v-if="comment.text">{{ comment.text }}</p>
        <button @click="deleteComment(index)" class="delete" aria-label="delete"></button>
      </div>
    </div>
  </article>
</template>
<script>
  import { deletePost, addComment, deleteComment, addLike, removeLike } from '../repository'
  import UpdatePostModule from './UpdatePostModule'
  import AddCommentModule from './AddCommentModule'
  import {mapGetters} from 'vuex'
  import Moment from 'moment'
 
  export default {
    name: 'PostItem',
    props: [ 'post' ],
    components: { UpdatePostModule, AddCommentModule },
    data(){
      return {
        comments: [],
        liked: false
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'checkUser'
        ]),
    
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
           location.reload();
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
          .catch(err => console.log(err));
          location.reload();
      },
      removeLike(e) {
        e.preventDefault();
        removeLike(this.post._id)
          .catch(err => console.log(err));
          location.reload();
      },
      checkIfLiked(){
        let kappa = false
        this.post.likes.forEach(like => {
         
           if(like.user === this.checkUser.id) {
            
             kappa = true;
           } 
        });
        return kappa;
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

<style scoped>
</style>
