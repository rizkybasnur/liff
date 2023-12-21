<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12"><b>MOVIES</b></v-col>
    </v-row>

    <ListComponent
      v-if="data"
      :data="data"
      :page.sync="page"
      @toggle="toggleDialog"
      @page="onInput"
    />

    <ViewComponent v-if="isDialog" v-model="isDialog" :data="dataDialog" />
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
      isDialog: false,
      dataDialog: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const payload = {
        page: this.page,
        pageSize: this.pageSize,
      };
      api
        .post("/getAllData", payload)
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
