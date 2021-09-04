import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
Vue.config.productionTip = false


import {postRequest} from "./utils/axiosUtils";
import {deleteRequest} from "./utils/axiosUtils";
import {getRequest} from "./utils/axiosUtils";
import {putRequest} from "./utils/axiosUtils";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.css'


Vue.prototype.postRequest=postRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.use(ElementUI)


router.beforeEach((to,from,next)=>{
  if (sessionStorage.getItem('tokenStr'))
  {
    initMenu(router,store);
    next();
  }
  else
  {
      next();
  }
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
