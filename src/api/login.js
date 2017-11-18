import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: 'sys/login?username='+username+'&password='+password,
    method: 'post',
    data: {
      /*username,
      password*/
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: 'sys/user/info',
    method: 'get',
    params: { /*token*/ }
  })
}

export function logout() {
  return fetch({
    url: '/sys/logout',
    method: 'post'
  })
}
export function getMenuList() {
  return fetch({
    url: 'sys/menu/nav',
    method: 'get',
    params: {}
  })
}
