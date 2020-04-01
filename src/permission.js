import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import {getToken} from './utils/auth';
import settings from "./settings";
import {message} from "./utils/message"; // get token from cookie

NProgress.configure({}); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    NProgress.inc();
    // set page title
    document.title = (to.name ? (to.name + ' | ') : '') + settings.title;

    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'});
            NProgress.done();
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = await store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['manager','editor']
                    const {roles, permissions} = await store.dispatch('user/getInfo');

                    // generate accessible routes map based on roles
                    // const accessRoutes = await store.dispatch('permission/generateRoutes', roles, permissions);
                    store.dispatch('permission/generateRoutes', {roles, permissions}).then(response => {
                        // dynamically add accessible routes
                        router.addRoutes(response);

                        // hack method to ensure that addRoutes is complete
                        // set the replace: true, so the navigation will not leave a history record
                        next({...to, replace: true});
                    });
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken');
                    message('error', error);
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
