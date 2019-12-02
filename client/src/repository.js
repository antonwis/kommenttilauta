import axios from 'axios';
const BASE_URL = 'http://localhost:5000';
 
export function getPosts() {
        return axios.get(`${BASE_URL}/api/forum/list`)
                .then(response => response.data);
}
 
export function deletePost(id){
        return axios.post(`${BASE_URL}/api/forum/delete/${id}`)
                .then(response => response.data)
                .catch(err => Promise.reject(err.message));
}
export function createPost(data) {
        return axios.post(`${BASE_URL}/api/forum/create`, 
        {
            title: data.title,
            body: data.body.body,
            likes: 0,
            comments: "",
            date: Date.now
        }
        )
        .then(response => {
                        return response.data
                })
                .catch(err => Promise.reject(err.message));
}
 
export function updatePost(data, id) {
        return axios.post(`${BASE_URL}/api/forum/update/${id}`, { data })
                .then(response => {
                        return response.data
                })
                .catch(err => Promise.reject(err.message));
}