<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12"><b>SEARCH</b></v-col>
    </v-row>

    <v-row>
      <v-col cols="10">
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="search.title"
              outlined
              dense
              label="Title"
              placeholder="Title"
              @keydown.enter="getData()"
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="search.desciption"
              outlined
              dense
              label="Description"
              placeholder="Description"
              @keydown.enter="getData()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="search.artist"
              outlined
              dense
              label="Artists"
              placeholder="Artists"
              @keydown.enter="getData()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="search.genre"
              outlined
              dense
              :items="items"
              item-text="text"
              item-value="value"
              label="Genres"
              persistent-hint
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-btn block @click="getData">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <ListComponent
        v-if="data"
        :data="data"
        :page.sync="page"
        @toggle="toggleDialog"
        @page="onInput"
      />
      <ViewComponent v-if="isDialog" v-model="isDialog" :data="dataDialog" />
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
import ListComponent from "@/components/ListComponent.vue";
import ViewComponent from "@/components/ViewComponent.vue";

export default {
  components: { ListComponent, ViewComponent },

  data() {
    return {
      data: [],
      page: 1,
      pageSize: 8,
      search: {
        title: "",
        artist: "",
        genre: "",
        description: "",
        page: 1,
        pageSize: 8,
      },
      items: [
        { text: "Romance", value: "ROM" },
        { text: "Thriller", value: "THR" },
        { text: "Action", value: "ACT" },
        { text: "Comedy", value: "COM" },
      ],
      isDialog: false,
      dataDialog: null,
    };
  },
  methods: {
    getData() {
      const payload = this.search;
      api
        .post("/searchMovies", payload)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    toggleDialog(e) {
      this.dataDialog = e;
      this.isDialog = true;
    },
    onInput(e) {
      this.page = e;
      this.getData();
    },
  },
};
</script>
