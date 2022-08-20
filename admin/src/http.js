import axios from "axios";
import Vue from "vue"
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token)
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


http.interceptors.response.use(res => {
  return res
}, err => {
  const response = err.response
  if (response.data.message) {
    Vue.prototype.$message.error(response.data.message)
    if (response.status === 401) {
      console.log('login');
      router.push('/login')
    }
  }
  return Promise.reject(err)

})


export default http