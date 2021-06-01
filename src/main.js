import { createApp } from 'vue'
import App from './App.vue'

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Make BootstrapVue available throughout your project
//createApp.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//createApp.use(IconsPlugin)

//Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

createApp(App).mount('#app')
