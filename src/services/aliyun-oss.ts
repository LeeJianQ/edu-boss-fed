/**
 * 阿里云上传
 */

import request from '@/utils/request'

export const aliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export const aliyunVideoUploadAddressAdnAuth = (params: unknown) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

export const transCodeVideo = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

export const getAliyunTransCodePercent = (lessonId: unknown) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
