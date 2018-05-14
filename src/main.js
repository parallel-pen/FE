// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
// import lodash from 'lodash';
import 'iview/dist/styles/iview.css';
import '@/assets/themes/light.less';
import App from './App';
import router from './router';

Vue.use(iView);

// Object.defineProperty(Vue.prototype, '$_', { value: lodash });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
