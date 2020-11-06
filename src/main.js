import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import { firestorePlugin } from "vuefire";
import VueFilterDateFormat from 'vue-filter-date-format';
import { formatDate } from '@/config/dateFilter'

Vue.use(firestorePlugin);

Vue.use(VueFilterDateFormat, formatDate);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
