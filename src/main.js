import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import firebase from 'firebase/app';
import store from "./store";

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(BootstrapVue)

const configOptions = {
  apiKey: "AIzaSyC4MxdfSvhhsTKNf87J55nVI_8i6FnnYNc",
  authDomain: "getwork-vue.firebaseapp.com",
  projectId: "getwork-vue",
  storageBucket: "getwork-vue.appspot.com",
  messagingSenderId: "961475968320",
  appId: "1:961475968320:web:82c2daba03c00ce78ccea5"
};


firebase.initializeApp(configOptions);
export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
