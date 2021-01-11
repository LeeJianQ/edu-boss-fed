import request from '@/utils/request'
import qs from 'qs'
interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export const getUserPages = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

export const forbidUser = (userId: string | number) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    params: {
      userId
    }
  })
}

// 启用用户 /boss/user/enableUser
export const enableUser = (userId: unknown) => {
  return request({
    method: 'GET',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}
