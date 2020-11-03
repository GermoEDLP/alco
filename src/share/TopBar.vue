import firebase from 'firebase';
<template>
  <div>
    <v-app-bar app elevate-on-scroll color="green" dark>
      <v-toolbar-title>Alco</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content v-if="user">
              <v-list-item-title>{{ user.displayName }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list color="error">
          <v-list-item>
            <v-list-item-title @click="logout">Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "TopBar",
  data() {
    return {
      drawer: null,
      user: null,
      items: [
        { title: "Mi perfil" },
        { title: "Diario de comidas" },
        { title: "Estadisticas" },
        { title: "Ajustes" },
      ],
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Usuario fuera");
        })
        .catch((e) => console.log);
    },
  },
  async beforeCreate() {
    this.user = await firebase.auth().currentUser;
  },
};
</script>

<style>
.v-list-item {
  cursor: pointer;
}
</style>