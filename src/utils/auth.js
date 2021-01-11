import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const userName ="userName"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getuserName(){
  return Cookies.get(userName)
}
//存储用户名
export function setUserName(value){
  Cookies.set(userName, value)
}