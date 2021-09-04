import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false


import {postRequest} from "./utils/axiosUtils";
import {deleteRequest} from "./utils/axiosUtils";
import {getRequest} from "./utils/axiosUtils";
import {putRequest} from "./utils/axiosUtils";



Vue.prototype.postRequest=postRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.use(ElementUI )
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
