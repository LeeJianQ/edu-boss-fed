import request from '@/utils/request'

export const getResourcePages = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 获取角色拥有的资源列表 /boss/resource/getRoleResources
export const getRoleResources = (roleId: unknown) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

// 获取所有的资源 /boss/resource/getAll
export const getAllResource = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

// 给角色分配资源 /boss/resource/allocateRoleResources
export const allocateRoleResources = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

// 保存或者更新资源 /boss/resource/saveOrUpdate
export const saveOrUpdateResource = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
