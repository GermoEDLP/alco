<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#385F73" dark>
          <v-card-title class="headline">
            Dia: {{ date | dateFormat("D") }} de
            {{ date | dateFormat("MMMM") }}</v-card-title
          >

          <v-list color="#385F73">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Desayuno</v-list-item-title>
                <v-list-item-subtitle>Creditos: 5,25</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Almuerzo</v-list-item-title>
                <v-list-item-subtitle>Creditos: 8,5</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-chip class="ma-2" color="pink" label text-color="white">
            Creditos Restantes: 8,5
          </v-chip>

          <v-card-actions>
            <v-btn text> Agregar comidas ahora </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.title"></v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-actions>
                <v-btn
                  v-if="item.artist === 'Ellie Goulding'"
                  class="ml-2 mt-3"
                  fab
                  icon
                  height="40px"
                  right
                  width="40px"
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn v-else class="ml-2 mt-5" outlined rounded small>
                  START RADIO
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { db } from "@/db";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      date: new Date(),
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
      ],
    };
  },
};
</script>
