<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12"><b>STATISTIC</b></v-col>
    </v-row>
    <div class="d-flex mb-8">
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="red"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-select
        v-if="tab == 1"
        v-model="genre"
        outlined
        dense
        :items="itemsGenre"
        item-text="text"
        item-value="value"
        label="Genres"
        persistent-hint
        hide-details
      >
      </v-select>
    </div>
    <ListComponent
      v-if="!isDetail && (dataMovie || dataGenre)"
      :data="tab == 0 ? dataMovie : dataGenre"
      :page.sync="page"
      @page="onInput"
    />
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
import ListComponent from "@/components/ListComponent.vue";

export default {
  components: { ListComponent },

  data() {
    return {
      genre: "ROM",
      dataMovie: [],
      dataGenre: [],
      isDetail: false,
      page: 1,
      pageSize: 8,
      tab: 0,
      items: ["Most Viewed Movie", "Most Viewed Genre"],
      itemsGenre: [
        { text: "Romance", value: "ROM" },
        { text: "Thriller", value: "THR" },
        { text: "Action", value: "ACT" },
        { text: "Comedy", value: "COM" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    tab() {
      this.getData();
      this.page = 1;
    },
    genre() {
      this.getData();
      this.page = 1;
    },
  },
  methods: {
    getData() {
      const payload = {
        page: this.page,
        pageSize: this.pageSize,
        genre: this.genre,
      };
      const url = this.tab == 0 ? "/mostViewedMovies" : "/sortedMovies";
      api
        .post(url, payload)
        .then((response) => {
          if (this.tab == 0) this.dataMovie = response.data;
          else this.dataGenre = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    onInput(e) {
      this.page = e;
      this.getData();
    },
  },
};
</script>
