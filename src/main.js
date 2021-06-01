import { createApp } from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Make BootstrapVue available throughout your project
App.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
App.use(IconsPlugin)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).mount('#app')
