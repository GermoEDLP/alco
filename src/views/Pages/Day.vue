<template>
  <div>
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(comida, indexCom) in comidas"
          :key="comida.index"
        >
          <v-expansion-panel-header disable-icon-rotate>
            {{ comida.name }}
            <template v-slot:actions> </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list two-line>
              <v-list-item-group active-class="pink--text" multiple>
                <template v-for="(item, index) in comida.items">
                  <v-list-item :key="item.title">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.producto"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="item.porcion"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="'Porc x ' + item.cantidad"
                        ></v-list-item-action-text>
                        <v-list-item-action-text
                          v-text="item.creditos + ' creditos'"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < comida.items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
                <v-list-item>
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-icon @click="openDialogNewFood(indexCom)"
                        >mdi-plus</v-icon
                      >
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Empieza modal -->
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Agregar nueva comida
            </v-card-title>

            <v-card-text>
              {{ comidaUpdate }}
              {{ $data }}
              <v-autocomplete
                v-model="model"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                chips
                clearable
                hide-details
                hide-selected
                item-text="name"
                item-value="id"
                label="Selecciona un alimento..."
                solo
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Busca el aliemnto que desees agregar
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <template v-slot:selection="{ attr, on, item, selected }">
                  <v-chip
                    v-bind="attr"
                    :input-value="selected"
                    color="blue-grey"
                    class="white--text"
                    v-on="on"
                  >
                    <span v-text="item.name"></span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-list-item-avatar
                    color="indigo"
                    class="headline font-weight-light white--text"
                  >
                    {{ item.name.charAt(0) }}
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.porcion"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <span v-text="item.creditos"></span>
                  </v-list-item-action>
                </template>
              </v-autocomplete>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="error"
                text
                @click="dialog = false"
                class="float-left"
              >
                Cerrar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Agregar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
    comidaUpdate: null,
    dialog: false,
    comidas: [
      {
        name: "Desayuno",
        items: [
          {
            creditos: 5,
            porcion: "Porc: cassette de musica",
            producto: "Queso port-salut",
            cantidad: 2,
          },
        ],
      },
      {
        name: "Colación Mañana",
      },
      {
        name: "Almuerzo",
      },
      {
        name: "Colación Tarde",
      },
      {
        name: "Merienda",
      },
      {
        name: "Colación media tarde",
      },
      {
        name: "Cena",
      },
    ],
  }),
  methods: {
    openDialogNewFood(index) {
      this.comidaUpdate = index;
      this.dialog = true;
    },
  },
  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = [
            {
              id:1,
              name: "Queso port salut",
              creditos: 2.25,
              porcion: "Cassette de musica",
            },
            {
              id:2,
              name: "Queso mantecoso",
              creditos:3,
              porcion: "Cassette de musica",
            },
          ];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style>
</style>