import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

function redirectLogin (): void {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项
  // baseUrl
  // timeOut
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false
let requests: unknown[]
request.interceptors.response.use(function (response) {
  // 响应状态码 2XX
  return response
}, async function (error) {
  if (error.response) { // 请求发送成功。但是状态码超出 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 刷新 token
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失效')
          }
          // 将队列中的请求重新发送
          requests.forEach((cb: any) => cb())
          // 清空任务队列
          requests = []
          store.commit('setUser', res.data.content)
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }

      // 刷新状态下，把请求挂起到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发送成功，但是没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 设置请求时发生一些未知的错误
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})

export default request
