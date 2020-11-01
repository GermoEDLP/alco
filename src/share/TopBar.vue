<template>
  <div>
      <v-app-bar app elevate-on-scroll color="green" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Alco</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

  </div>
</template>

<script>
export default {
    name: 'TopBar'
}
</script>

<style>

</style>