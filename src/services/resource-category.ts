import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 保存或者更新分类资源 /boss/resource/category/saveOrderUpdate
export const saveOrderUpdate = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}
