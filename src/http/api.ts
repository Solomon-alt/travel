import http from './index'

export default {
    // login({username,password}:{username:string,password:string,query?:string}){

    // } //参数后面一定要补充{username:string,password:string,query?:string}，不然会报错
    // 登录 =============================================================
    login({ username, password }: { username: string, password: string }) {
        return http.post('/accounts/login', {
            username: username,
            password: password
        })
    },
    // 获取手机验证码 =============================================================
    captchas({ tel }: { tel: string }) {
        return http.post('/captchas', {
            tel
        })
    },
    // 注册 =============================================================
    register({ username, nickname, captcha, password }: { username: string, nickname: string, captcha: string, password: string }) {
        return http.post('/accounts/register', {
            username, nickname, captcha, password
        })
    },
    // 首页轮播图 =============================================================
    banner(){
        return http.get('/scenics/banners')
    },
    city({name}:{ name:string}){
        return http.get(`/cities?name=${name}`)
    },
    // 城市菜单列表 =============================================================
    cityList(){
        return http.get('/posts/cities')
    }
}