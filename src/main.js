import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import '../static/euroCup.css'

Vue.config.debug = process.env === 'development'

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

Vue.http.options.emulateJSON = true;