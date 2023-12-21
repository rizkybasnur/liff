<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        LOGIN
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-form ref="form" lazy-validation>
          <div>
            <v-text-field
              v-model="input.username"
              outlined
              :rules="[(value) => !!value || '*wajib diisi.']"
              label="Username"
              placeholder="Username"
            >
            </v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="input.password"
              outlined
              :rules="[(value) => !!value || '*wajib diisi.']"
              label="Password"
              placeholder="Password"
              @keydown.enter="onSubmit"
            >
            </v-text-field>
          </div>
          <v-btn block @click="onSubmit">Login</v-btn>
        </v-form>
        <v-snackbar v-model="isSnackbar" :timeout="timeout">
          {{ snackbarText }}
        </v-snackbar>
        <!-- <div class="text-center">
          <a> Create Account </a>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
export default {
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      isSnackbar: false,
      snackbarText: "",
      timeout: "1000",
    };
  },
  methods: {
    onSubmit() {
      if (!this.$refs.form.validate()) return;

      const payload = this.input;

      api
        .post("/login", payload)
        .then((response) => {
          this.$store.dispatch("updateAdminStatus", response.data.isAdmin);
          this.$store.dispatch("updateLoginStatus", true);
          this.isSnackbar = true;
          this.snackbarText = response.data.message;
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        })
        .catch((error) => {
          this.isSnackbar = true;
          this.snackbarText = error;
        });
    },
  },
};
</script>
