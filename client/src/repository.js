import axios from 'axios';
import store from './store/auth'
import router from './router'
const BASE_URL = 'http://localhost:5000';




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
                const response = await axios.delete(`${BASE_URL}/api/forum/${id}`,{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                })
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
                const response = await axios.post(`${BASE_URL}/api/forum/create/`, object,{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                });
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
 
// Update existing post
export async function updatePost(data, id) {
        try {
                const response = await axios.post(`${BASE_URL}/api/forum/update/${id}`, { data },{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                })
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
export function login (info) {
        axios.post(`${BASE_URL}/api/auth`, { email: info.email, password: info.password })
          .then(response => loginSuccessful(response))
          .catch(error => loginFailed(error))
      }
 export function logout(){
        return new Promise((resolve, reject) => {
                  store.commit('logout')
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  resolve()
        })
}
export function loginSuccessful (res) {
        console.log(res.data);
        if (!res.data.user.token) {
          loginFailed()
          return
        }

        localStorage.setItem("token", res.data.user.token);
        localStorage.setItem("user",JSON.stringify(res.data.user))
        store.commit('auth_success',res.data.user)
        router.push('/');
      }
export function loginFailed (error) {
        store.commit('auth_error',error)
        localStorage.removeItem('token')
        
	console.log(error)
        
      }
export function register(info){
        axios.post(`${BASE_URL}/api/users`, {name: info.name, email: info.email, password: info.password})
                .then(request => loginSuccessful(request))
                .catch(error => loginFailed(error))
        
}

// Like a post
export async function addLike(id) {
        try {
                const user = {id: JSON.parse(localStorage.user).id}
                const response = await axios.put(`${BASE_URL}/api/forum/like/${id}`,user ,{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                })
                return response.data;
        } catch (err) {
                return await Promise.reject(err.message);
        }
}

// Remove like from post
export async function removeLike(id) {
        try {
                const user = {id: JSON.parse(localStorage.user).id}
                const response = await axios.put(`${BASE_URL}/api/forum/unlike/${id}`, user,{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                })
                return response.data;
        } catch (err) {
                return await Promise.reject(err.message);
        }
}

// Add a comment to a post
export async function addComment(id, data) {
        
        try {
                const response = await axios.post(`${BASE_URL}/api/forum/comment/${id}`, data,{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                })
                return response.data;

        } catch (err) {
                return await Promise.reject(err.message);
        }
}

// Delete a comment from a post
export async function deleteComment(postId, commentId) {
        const user = {id: JSON.parse(localStorage.user).id}
        try {
                await axios.delete(`${BASE_URL}/api/forum/comment/${postId}/${commentId}`,user,{
                        headers: {
                                authToken: localStorage.getItem('token')
                        }
                })
                
        } catch (err) {
                return await Promise.reject(err.message);
        }
}
