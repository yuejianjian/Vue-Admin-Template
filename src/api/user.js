import request from '@/utils/request'
//注册
export function register(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}
//登录
export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}
//获取验证码
export function GetSms(data){
  return request({
      url:"/getSms/",
      method:"post",
      data
  })
}
//添加部门
export function DepartmentAddApi(data) {
  return request({
    url: '/department/add/',
    method: 'post',
    data
  })
}
//获取部门列表
export function GetDepartmentList(data) {
  return request({
    url: '/department/list/',
    method: 'post',
    data
  })
}
//切换部门启用状态
export function StatusDepartmentList(data) {
  return request({
    url: '/department/status/',
    method: 'post',
    data
  })
}
//删除部门
export function DeleteDepartmentList(data) {
  return request({
    url: '/department/delete/',
    method: 'post',
    data
  })
}
//获取部门详情信息
export function GetDepartDetails(data) {
  return request({
    url: '/department/detailed/',
    method: 'post',
    data
  })
}
//编辑部门详情信息
export function EditDepartDetails(data) {
  return request({
    url: '/department/edit/',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
