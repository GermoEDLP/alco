<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Autenticación
      <small>Datos que nos permitirán autenticar tu cuenta</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-container>
        <v-form ref="form1" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="pass"
            :rules="passRules"
            label="Contraseña"
            required
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-text-field
            v-model="pass2"
            :rules="pass2Rules"
            label="Repite contraseña"
            required
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-form>
        <v-alert color="red" dense text type="success" v-if="show4"
          >El email {{emailFalse}}, ya esta siendo utilizado. Por favor, elija otro.</v-alert
        >
        <v-alert color="red" dense text type="success" v-if="show3"
          >Las constraseñas deben coicidir</v-alert
        >
      </v-container>
      <v-btn color="primary" @click="checkEmailPassForm()"> Continuar </v-btn>
      <v-btn text @click="this.$router.replace('login')"> Cancelar </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      Datos personales
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-form ref="form2" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="numberRules"
          label="Nombre y apellido"
          required
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="born"
          :rules="numberRules"
          label="Fecha de nacimiento"
          required
          type="date"
        ></v-text-field>

        <v-select :items="sexItems" label="Sexo" v-model="sex"></v-select>

        <v-alert color="blue" text type="info">
          La elección del sexo biologico es tenido en cuenta para coeficientes metabolicos, no será expresado en ninguna parte de la cuenta.
        </v-alert>
      </v-form>
      <v-btn color="primary" @click="checkPersonalDataForm"> Continuar </v-btn>
      <v-btn text @click="e6 = 1"> Volver </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      Salud
      <small
        >Estos datos nos permitirán calcular valores como la IMC, los creditos
        por día, etc. Tambien te permitirá valorar tus progresos.</small
      >
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-form ref="form3" v-model="valid" lazy-validation>
        <v-text-field
          v-model="weight"
          :rules="numberRules"
          label="Peso"
          required
          type="number"
          suffix="Kg"
        ></v-text-field>
        <v-text-field
          v-model="height"
          :rules="numberRules"
          label="Altura"
          required
          type="number"
          suffix="cm"
        ></v-text-field>

        <v-alert color="blue" text type="info">
          Ten en cuenta que la altura esta en centimetros. Ejemplo: si tu altura
          es de 1,65 metros, entonces, serán 165 cm.
        </v-alert>
      </v-form>
      <v-btn color="primary" @click="checkSaludForm"> Continuar </v-btn>
      <v-btn text @click="es = 2"> Volver </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 4" step="4">
      Foto
      <small
        >Te invitamos a subir una foto para comparar con tus futuros
        progresos</small
      >
    </v-stepper-step>

    <v-stepper-content step="4">
      <v-file-input label="File input" prepend-icon="mdi-camera"></v-file-input>
      <v-alert text type="info">
        Este paso no es obligatorio. Mas adelante puedes completarlo.
      </v-alert>
      <v-btn color="primary" @click="e6 = 5"> Continuar </v-btn>
      <v-btn text @click="es = 3"> Volver </v-btn>
    </v-stepper-content>

    <v-stepper-step step="5"> Final </v-stepper-step>
    <v-stepper-content step="5">
      <h3>Excelente!!</h3>
      <p>Completaste tu inscripción.</p>
      <p>
        Cuando termines este paso, se te enviará un mail para que confirmes la
        dirección y ya podrás utilizar la aplicación.
      </p>
      <p>Esperamos que disfrutes de este viaje con nosotros.</p>
      <p>Saludos.</p>
      <v-btn color="primary" @click="final"> Continuar </v-btn>
      <v-btn text @click="es = 4"> Volver </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>


<script>
import { db } from "@/db";
import firebase from "firebase";

export default {
  data: () => ({
    e6: 1,
    valid: true,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    emailFalse: '',
    name: "",
    sex: "",
    sexItems: ["Mujer", "Hombre"],
    weight: "",
    height: "",
    born: "",
    numberRules: [(v) => !!v || "Este valor es requerido"],
    pass: "",
    passRules: [
      (v) => !!v || "La contraseña es requerida",
      (v) => (v && v.length >= 6) || "Debe tener al menos 6 caracteres",
    ],
    pass2: "",
    pass2Rules: [
      (v) => !!v || "La repetición de contraseña es requerida",
      (v) => (v && v.length >= 6) || "Debe tener al menos 6 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "El email es requerido",
      (v) => /.+@.+\..+/.test(v) || "Debe tener un formato valido",
    ],
  }),

  methods: {
    checkEmailPassForm() {
      this.show3 = false;
      this.e6 = 2;
      //   if (this.pass === this.pass2) {
      //     if (this.$refs.form1.validate()) {
      //       this.e6 = 2;
      //     } else {
      //       return;
      //     }
      //   } else {
      //     this.show3 = true;
      //     this.pass = "";
      //     this.pass2 = "";
      //   }
    },
    checkPersonalDataForm() {
      if (this.$refs.form2.validate()) {
        this.e6 = 3;
      }
    },
    checkSaludForm() {
      if (this.$refs.form3.validate()) {
        this.e6 = 4;
      }
    },
    final() {
      this.newUserAuth()
        .then((user) => {
          console.log(user)
          this.newUserDB(user.user.uid);
          this.actualizarNombre();
          this.$router.push('login')
        })
        .catch((e) => {
          if(e.code == 'auth/email-already-in-use'){
            this.e6 = 1;
            this.emailFalse = this.email;
            this.email = '';
            this.show4 = true;
          }
          console.log(e)
        });
    },
    async newUserAuth() {
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.pass);
    },
    newUserDB(id) {
      let date = new Date();
      return db.collection("user").doc(id).set({
        id: id,
        name: this.name,
        email: this.email,
        weight: this.weight,
        height: this.height,
        born: this.born,
        sex: this.sex,
        created_at: date,
        updated_at: date,
      });
    },
    async actualizarNombre(){
      let user = await firebase.auth().currentUser;
      return user.updateProfile({
        displayName: this.name
      })
    }
  },
};
</script>