import {getToken, setToken, removeToken} from "../../utils/auth";
import {login, getInfo} from './../../api/auth'
import {message} from "../../utils/message";
import {resetRouter} from "../../router";
import {logout} from "../../api/auth";

const state = {
    id: null,
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
};

const mutations = {
    SET_ID: (state, id) => {
        state.id = id;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    },
};

const actions = {
    // user login
    login({commit}, userInfo) {
        const {email, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({email: email.trim(), password: password})
                .then(response => {
                    const {data} = response;
                    if (data.status) {
                        message('success', data.message);
                        commit('SET_TOKEN', data.data.token);
                        setToken(data.data.token);
                        resolve();
                    } else {
                        message('info', data.message);
                        reject(data.message)
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then(response => {
                    const {data} = response;
                    if (data.status) {
                        const {roles, name, avatar, permissions, id} = data.data.user;
                        // roles must be a non-empty array
                        if (!roles || roles.length <= 0) {
                            reject('Hello, ' + name + ' You dont have any permission to access this dashboard!');
                        }

                        commit('SET_ROLES', roles);
                        commit('SET_PERMISSIONS', permissions);
                        commit('SET_NAME', name);
                        commit('SET_AVATAR', avatar);
                        commit('SET_ID', id);
                        resolve(data.data.user);
                    } else {
                        reject('Verification failed, please Login again.')
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
        });
    },

    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resetRouter();
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
