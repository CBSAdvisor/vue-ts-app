import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@/styles/index.scss';
import '@/permission';

import '../mock'; // simulation data requests

import App from '@/App.vue';
import store from '@/store';

import '@/registerServiceWorker';

import router from '@/router';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

import i18n from '@/i18n';

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
