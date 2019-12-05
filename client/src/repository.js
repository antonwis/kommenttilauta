import axios from 'axios';
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
                const response = await axios.post(`${BASE_URL}/api/forum/delete/${id}`);
                return response.data;
        }
        catch (err) {
                return await Promise.reject(err.message);
        }
}
export async function createPost(data) {
        try {
                const response = await axios.post(`${BASE_URL}/api/forum/create`, { title: data.title, body: data.body });
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