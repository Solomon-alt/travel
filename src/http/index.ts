import axios, { AxiosError, AxiosInstance,AxiosRequestConfig, AxiosResponse } from 'axios';
import nprogress from 'nprogress';
import { ElMessage } from 'element-plus'


const http: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

http.interceptors.request.use((config: AxiosRequestConfig) => {
    nprogress.start()
    //token
    return config
},(err:AxiosError) => {
    nprogress.done()
    return Promise.reject(err)
})



http.interceptors.response.use((res: AxiosResponse<any>) => {
    return res.data
},(err:AxiosError) => {
    nprogress.done();
    //请求失败
    const stutas = err.response && err.response.status;
     if (stutas === 400) {
        ElMessage.error("参数错误");
     }
     if (stutas === 401) {
        ElMessage.error("没有权限");
     }
     if (stutas === 403) {
        ElMessage.error("登陆过期");
     }
     if (stutas === 404) {
        ElMessage.error("路径错误");
     }
     if (stutas === 500) {
        ElMessage.error("服务器错误");
     }
     if (stutas === 503) {
        ElMessage.error("服务器在维护");
     }
})

export default http