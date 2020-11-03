<template>
  <v-container>
      <v-row>
<logPres></logPres>
      </v-row>
    <v-row align-content="center">
        <v-card class="pa-8 card">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="pass"
          :rules="passRules"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          label="Contraseña"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          label="Recordarme"
          required
        ></v-checkbox>


        <router-link to="/register">
          Registrarse
        </router-link>

        <v-divider class="divider"></v-divider>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Login
        </v-btn>
        <v-btn :disabled="!valid" color="error" class="mr-4 float-right" @click="logout">
          Salir
        </v-btn>
      </v-form>
    </v-card>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import logPres from '@/components/textos/loginPresentacion'

export default {
  name: "Login",
  components: {
      logPres
  },
  data: () => ({
    valid: true,
    show: false,
    pass: "",
    passRules: [
      (v) => !!v || "La contraseña es requerida",
      (v) =>
        (v && v.length <= 10) ||
        "La contraseña debe tener al menos 6 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "EL email es necesario",
      (v) => /.+@.+\..+/.test(v) || "Por favor coloca un mail valido",
    ],
    checkbox: false,
  }),

  created(){
    let user = this.userRecord();
    if(user){
      this.email = user.email;
      this.pass = user.pass;
    }
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.pass)
        .then((user) => {
          if(this.checkbox){
            this.recordarme(this.email, this.pass);
          }
          this.$router.push('home')

        }).catch((e) => {
          console.log(e);
        })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Usuario fuera");
        })
        .catch((e) => console.log);
    },
    recordarme(email, pass){
        localStorage.setItem('userAlco', JSON.stringify({email: email, pass: pass}))
    },
    userRecord(){
      if(localStorage.getItem('userAlco')){
        return JSON.parse(localStorage.getItem('userAlco'));
      }else{
        return false;
      }
    }
  },
};
</script>

<style>
.card {
  margin: auto;
}
.divider{
  margin: 12px
}
</style>