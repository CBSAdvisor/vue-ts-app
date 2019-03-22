import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@/permission';

import '../mock'; // simulation data requests

import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';
import store from '@/store';
import '@/plugins/VeeValidate';
import '@/plugins/vue-sweetalert';

import '@/registerServiceWorker';

Vue.use(BootstrapVue);
import '@/styles/index.scss';

Vue.config.productionTip = false;

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
