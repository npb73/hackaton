import axios from 'axios'

export default axios.create({
    baseURL: 'http://'+ '95.174.95.181:8080' + '/api',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
})
axios.defaults.baseURL= 'http://'+ '95.174.95.181:8080' + '/api'
