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
 
export async function getPosts() {
        const response = await axios.get(`${BASE_URL}/api/forum/list`);
        return response.data;
}
 
export async function deletePost(id){
        try {
                const response = await axios.delete(`${BASE_URL}/api/forum/${id}`);
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
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
        axios.post('/auth', { user: info.email, password: info.password })
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