import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import { routes } from './routes.js';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:8000/api';

const router = new VueRouter({
   routes,
   mode: 'history'
});

export const eventBus = new Vue();

new Vue({
  el: '#app',
    router,
  render: h => h(App)
})
