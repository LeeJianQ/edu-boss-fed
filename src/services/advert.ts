/**
 * 广告管理
 */
import request from '@/utils/request'

// 根据Id获取广告信息 /front/ad/getAdById
export const getAdById = (id: unknown) => {
  return request({
    url: '/front/ad/getAdById',
    method: 'GET',
    params: {
      id
    }
  })
}

// 获取所有广告列表 /front/ad/getAdList
export const getAdList = () => {
  return request({
    url: '/front/ad/getAdList',
    method: 'GET'
  })
}

// 新增或者修改广告的信息 /front/ad/saveOrUpdate
export const saveOrUpdateAd = (data: unknown) => {
  return request({
    url: '/front/ad/saveOrUpdate',
    method: 'POST',
    data
  })
}

// 获取所有广告位 /front/ad/space/getAllSpaces
export const getAllSpaces = () => {
  return request({
    url: '/front/ad/space/getAllSpaces',
    method: 'GET'
  })
}

// 根据id 获取广告位 /front/ad/space/getSpaceById
export const getSpaceById = (id: unknown) => {
  return request({
    url: '/front/ad/space/getSpaceById',
    method: 'GET',
    params: {
      id
    }
  })
}

// 新增或者修改广告位信息 /front/ad/space/saveOrUpdate
export const saveOrUpdateAdSpace = (data: unknown) => {
  return request({
    url: '/front/ad/space/saveOrUpdate',
    method: 'POST',
    data
  })
}

// 更改广告的状态 /front/ad/updateStatus
export const updateAdStatus = (params: unknown) => {
  return request({
    url: '/front/ad/updateStatus',
    method: 'GET',
    params
  })
}
