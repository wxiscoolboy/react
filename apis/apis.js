import axios from 'axios'

export var SERVER_IP = 'http://127.0.0.1:3333'

// 设置服务器默认ip
axios.defaults.baseURL = SERVER_IP


//登录
export var api_login = (params) => axios.post('/login', params)

//获取热映/待映电影列表
export var api_searchMovieList = (params) => axios.get('/searchMovieList', {params})

//获取电影详情
export var api_getmovieinfo = (params) => axios.get('/getmovieinfo', {params})

//获取影院列表
export var api_celimaList = () => axios.get('/celimaList')

//获取影院具体排片
export var api_celimainfo = (params) => axios.get('/celimainfo', {params})

//根据影院ID+电影ID获取当前电影的具体排片时间+放映厅
export var api_celimamovieinfo = (params) => axios.get('/celimamovieinfo', {params})