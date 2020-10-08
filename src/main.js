import Vue from 'vue';
import App from './App.vue';

/**
 * Import Navigation Config
 */
import AppNavigation from './config/navigation.json';


Vue.config.productionTip = false;

// Catch all error handling.
Vue.config.errorHandler = (err, vm, info) => {
  // tslint:disable-next-line:no-console
  console.error('error: ' + err + ', vm: ' + vm + ', info: ' + info);
};
window.onerror = (msg, url, line, col, error) => {
  // tslint:disable-next-line:no-console
  console.error('msg: ' + msg + ', url: ' + url + ', line: ' + line + ', col: ' + col + ', error: ' + error);
};


/**
 * Register Navigation bar configuration globally for exersize sake
 * Normally we can can perform internationalization here
 */
Vue.prototype.$navigation = AppNavigation;

/**
 * Style Files
 */
require('./styles/simpleNavBar.scss');

new Vue({
  render: h => h(App),
}).$mount('#app');