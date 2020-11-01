<template>
  <v-app>
    <TopBar></TopBar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import TopBar from "./share/TopBar"

export default {
  name: "App",

  components: {
    HelloWorld,
    TopBar
  },

  data: () => ({
    //
  }),
};
</script>
