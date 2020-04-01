import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueAdminLte from '@cookieseater/vue-adminlte3';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import Multiselect from 'vue-multiselect'
import '@cookieseater/vue-adminlte3/example/src/plugins/icons'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
require('admin-lte/dist/css/adminlte.min.css');
require('./assets/sweetalert2.scss');
require('./assets/sass/transition.scss');
require('nprogress/nprogress.css');
require('vue-multiselect/dist/vue-multiselect.min.css');
require('element-ui/lib/theme-chalk/index.css');
import ElementUI from 'element-ui';

import './permission';

try {
    // window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
} catch (e) {
    // console.log(e);
}

require('admin-lte/dist/js/adminlte.min');

Vue.use(VueAdminLte, {});

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(ElementUI);

Vue.component('multiselect', Multiselect);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
