/**
 * 课程课时相关请求模块
 */

import request from '@/utils/request'

export const saveOrUpdateLesson = (data: unknown) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
