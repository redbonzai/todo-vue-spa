// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import { store } from './store/index'

Vue.config.productionTip = false

// Instantiation of the EventBus in order to communicate between components.
window.eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //store: store,
  components: { App },
  template: '<App/>'
})
