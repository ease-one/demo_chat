const BASE_URL = 'https://study.duyiedu.com';
const TOKEN_KEY = 'token'

// 避免全局污染，用 let 或 canst 声明变量，或者使用自执行函数，减少污染

const get = async function (path) {
  const headers = {}
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    headers.authorization = `bearer ${token}`
  }
  return await fetch(BASE_URL + path, { headers })
}

const post = async function (path, params) {
  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    headers.authorization = `bearer ${token}`
  }
  return await fetch(BASE_URL + path, {
    headers,
    method: 'POST',
    body: JSON.stringify(params)
  })
}

// 注册
const reg = async function (userInfo) {
  return await post('/api/user/reg', userInfo).then(resp => resp.json());
}

// 登录
const login = async function login(loginInfo) {
  const resp = await post('/api/user/login', loginInfo);
  const result = await resp.json();

  if (result.code === 0) {
    localStorage.setItem(TOKEN_KEY, resp.headers.get('authorization'));
  }
  return result;
}

// 验证账号
const exists = async function (loginId) {
  return await get(`/api/user/exists?loginId=${loginId}`).then(resp => resp.json());
}

// 获取当前登录用户信息
const profile = async function () {
  return await get('/api/user/profile').then(resp => resp.json());
}

// 发送聊天信息
const sendChat = async function (content) {
  return await post('/api/chat', { content }).then(resp => resp.json());
}

// 获取历史聊天记录
const getHistory = async function () {
  return await get('/api/chat/history').then(resp => resp.json());
}

// 退出
const loginOut = function () {
  localStorage.removeItem(TOKEN_KEY)
}