import axios from 'axios';
import QS from 'qs';
import store from '@/store';
import { message } from 'ant-design-vue';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://开发环境地址.com';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'http://调试环境地址.com';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://产品环境地址.com';
}

// 创建一个axios实例
let requests = axios.create({ timeout: 1000 * 10 });

// 设置axios的默认POST请求头
requests.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

// 请求前拦截
requests.interceptors.request.use(
  // 修改 axios 的config参数
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          // 使用Antdv提供的Message, 全局报告一个错误
          message.error('访问权限错误, 该接口仅允许登陆的用户访问.');
          break;
        default:
          message.error('访问错误');
      }
      return Promise.reject(error.response);
    } else {
      // 网络中断时
      if (!window.navigator.onLine) {
        // 处理断网事件
        message.error('网络连接超时');
      } else {
        return Promise.reject(error);
      }
    }
  }
);
/**
 * get请求
 * @param {String} url [api地址]
 * @param {Object} params [get参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    requests
      .get(url, {
        params: params,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方请求
 * @param {String} url [api地址]
 * @param {Object} params [post参数]
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    requests
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

requests._get = get;
requests._post = post;

export default requests;
