import request from '../utils/request';

export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: data,
    });
}

// eslint-disable-next-line no-unused-vars
export function getInfo(token) {
    return request({
        url: '/auth/user',
        method: 'get',
    });
}

export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post',
    });
}
