<template>
    <div class="container">
      <div v-if="posts">
        <div class="header">
        <CreatePostModule @createPost="createPost"/>
        </div>
        <div>
          <PostItem v-for="(post, index) in posts" :post="post" :key="index" @deletePost="deletePost" @updatePost="updatePost"/>
        </div>
      </div>
    </div>
</template>
 
<script>
import PostItem from './PostItem.vue'
import CreatePostModule from './CreatePostModule.vue'
import { getPosts } from '../repository'
 
export default {
  name: "Forum",
  components: { PostItem, CreatePostModule  },
  data(){
    return {
      posts: []
    }
  },
  methods: {
    deletePost(id){
      let posts = this.posts.filter(post => post._id != id)
      this.posts = posts;
      location.reload();
    },
    updatePost(post){
      this.deletePost(post._id);
      this.createPost(post);
    },
    createPost(post){
        this.posts = [post, ...this.posts];
        location.reload();
    }, 
  },
  mounted() {
    getPosts()
      .then(data => this.posts = data.posts)
      .catch((err => console.log(err)));
  },
  
}
</script>

<style scoped>
div.header {
  margin: 5px;
}
</style>