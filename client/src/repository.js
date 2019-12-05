import axios from 'axios';
import store from './store'
const BASE_URL = 'http://localhost:5000';

export default axios.create({
        baseURL: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })


// Get all posts
export async function getPosts() {
        try {      
                const response = await axios.get(`${BASE_URL}/api/forum/list`);
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}

// Get post by id
export async function getPost(id) {
        try {      
                const response = await axios.get(`${BASE_URL}/api/forum/${id}`);
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
 
// Delete post by id
export async function deletePost(id){
        try {
                const response = await axios.delete(`${BASE_URL}/api/forum/${id}`);
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}

// Create new post
export async function createPost(data) {
        const object = { title: data.title, body: data.body };
        try {
                const response = await axios.post(`${BASE_URL}/api/forum/create/`, object);
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
 
// Update existing post
export async function updatePost(data, id) {
        try {
                const response = await axios.post(`${BASE_URL}/api/forum/update/${id}`, { data });
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
export function login (info) {
        axios.post('/api/auth', { user: info.email, password: info.password })
          .then(request => loginSuccessful(request))
          .catch(error => loginFailed(error))
      }
export function loginSuccessful (req) {
        if (!req.data.token) {
          loginFailed()
          return
        }
        
        this.error = false
        localStorage.token = req.data.token
        store.dispatch('login')
        this.$router.replace(this.$route.query.redirect || '/')
      }
export function loginFailed (error) {
        console.log(error)
        store.dispatch('logout')
        delete localStorage.token
      }

// Like a post
export async function addLike(id) {
        try {
                const response = await axios.put(`${BASE_URL}/api/forum/like/${id}`);
                return response.data;
        } catch (err) {
                return await Promise.reject(err.message);
        }
}

// Remove like from post
export async function removeLike(id) {
        try {
                const response = await axios.put(`${BASE_URL}/api/forum/unlike/${id}`);
                return response.data;
        } catch (err) {
                return await Promise.reject(err.message);
        }
}

// Add a comment to a post
export async function addComment(id, data) {
        const cfg = {
                headers: {
                        'Content-Type': 'application/json'
                }
        };
        try {
                const response = await axios.post(
                        `${BASE_URL}/api/forum/comment/${id}`,
                        data,
                        cfg
                );

                return response.data;

        } catch (err) {
                return await Promise.reject(err.message);
        }
}

// Delete a comment from a post
export async function deleteComment(postId, commentId) {
        
        try {
                await axios.delete(`${BASE_URL}/api/forum/comment/${postId}/${commentId}`);
                
        } catch (err) {
                return await Promise.reject(err.message);
        }
}
