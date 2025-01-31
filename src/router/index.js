import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'

Vue.use(VueRouter);

/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('./../views/redirect'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('./../views/login'),
        hidden: true,
        meta: {
            title: 'Login Page'
        }
    },
    {
        path: '/404',
        name: '404 not found',
        meta: {title: 'Page404'},
        component: () => import('./../views/404'),
        hidden: true,
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('./../views/dashboard'),
                name: 'Dashboard',
                meta: {title: 'dashboard', icon: 'tachometer-alt', noCache: false},
            },
        ],
    },
];

export const asyncRoutes = [
    {
        path: '/users',
        component: Layout,
        redirect: 'noredirect',
        meta: {permissions: ['users.read']},
        children: [
            {
                path: 'list',
                component: () => import('./../views/users'),
                name: 'Users List',
                meta: {title: 'users list', icon: 'users', permissions: ['users.read']},
            },
        ],
    },
    {
        path: '/auth',
        component: Layout,
        redirect: 'roles',
        name: 'Administration',
        meta: {title: 'administration', icon: 'lock'},
        children: [
            {
                path: 'roles',
                component: () => import('./../views/roles'),
                name: 'Roles List',
                meta: {title: 'roles list', icon: 'lock', permissions: ['roles.read']},
            },
            {
                path: 'permissions',
                component: () => import('./../views/roles'),
                name: 'Permissions List',
                meta: {title: 'permissions list', icon: 'lock', permissions: ['permissions.read']},
            },
        ],
    },
    {path: '*', redirect: '/404', hidden: true},
];

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    base: process.env.MIX_LARAVUE_PATH,
    routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
