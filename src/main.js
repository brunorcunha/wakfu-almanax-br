import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/global';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import { Settings } from 'luxon';

Vue.config.productionTip = false;
Settings.defaultLocale = 'pt-BR';

new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: (h) => h(App)
}).$mount('#app');
