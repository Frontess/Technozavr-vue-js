// import { createApp } from 'vue'
import Vue from 'vue';
import App from './App.vue';

import { data } from './data';
import { ladyVue } from './function';

import router from './router';
import store from './store';

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

// createApp(App).mount('#app')

ladyVue(data.messageHello)
ladyVue(data.messageGoodbye)