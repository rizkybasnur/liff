<template>
  <v-app>
    <div class="d-flex" style="height: 100svh">
      <v-navigation-drawer permanent expand-on-hover>
        <v-list nav dense>
          <v-list-item-group active-class="red--text text--accent-4">
            <div class="text-center py-4">
              <v-list-item-title>
                <img src="@/assets/logo.png" alt="logo" width="35" />
              </v-list-item-title>
            </div>
            <v-list-item v-if="isAdmin" to="/create">
              <v-list-item-title>Create</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAdmin" to="/update">
              <v-list-item-title>Update</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isAdmin" to="/statistic">
              <v-list-item-title>Statistic</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!isAdmin" to="/">
              <v-list-item-title>Movies</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!isAdmin" to="/search">
              <v-list-item-title>Search</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!isAdmin" to="/views">
              <v-list-item-title>Views</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!isLoggedIn" to="/login">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item v-else @click="onLogOut">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-snackbar v-model="isSnackbar" :timeout="timeout">
        {{ snackbarText }}
      </v-snackbar>

      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isSnackbar: false,
      snackbarText: "",
      timeout: "1000",
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },

    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    onLogOut() {
      this.$store.dispatch("updateLoginStatus", false);
      this.$store.dispatch("updateAdminStatus", false);
      this.isSnackbar = true;
      this.snackbarText = "You Just Logged Out";
      setTimeout(() => {
        if (this.$route.fullPath !== "/") {
          this.$router.push("/");
        }
      }, 1000);
    },
  },
};
</script>
