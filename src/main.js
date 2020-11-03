import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
