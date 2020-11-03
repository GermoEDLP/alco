import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from 'firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      autenticado: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "registro",
    component: () => import("../views/Auth/Registro.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Traigo el valor del usuario. SI esta autenticado devuelve el user, sino devuelve null.
  let user = firebase.auth().currentUser;

  // Pregunto si la pagina a la que voy ('to'), tiene algun campo autenticado y si esta en true.
  let autorizacion = to.matched.some((record) => record.meta.autenticado);

  if(to.name === 'login' && user){
    next({name: 'home'});
  }

  // Criterios de autorización
  if (autorizacion && !user) {
    //Si la pagina requiere autorización y el usuario no esta logeado => lo lleva a login
    next({ name: 'login' });
  } else if (!autorizacion && user) {
    // SI no requiere autorización y esta logeado => lo lleva a home
    next({ name: 'home' });
  } else {
    // Dos situaciones restantes los lleva a donde pretendian ir (next)
    // Si no requiere autorizacion y no esta logeado
    // Si requiere autorización y esta logueado
    next();
  }
});

export default router;
