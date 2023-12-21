<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12"><b>UPDATE MOVIE</b></v-col>
    </v-row>
    <v-row v-if="isDetail">
      <v-col class="text-right">
        <v-btn @click="isDetail = false">Back</v-btn>
      </v-col>
    </v-row>
    <ListComponent
      v-if="!isDetail && data"
      :data="data"
      :page.sync="page"
      @toggle="toggleDetail"
      @page="onInput"
    />

    <v-row v-else>
      <FormComponent
        update-mode
        :data="dataDetail"
        @success="isDetail = false"
      />
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
import FormComponent from "@/components/FormComponent.vue";
import ListComponent from "@/components/ListComponent.vue";

export default {
  components: { FormComponent, ListComponent },

  data() {
    return {
      data: [],
      isDetail: false,
      dataDetail: null,
      page: 1,
      pageSize: 8,
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
    toggleDetail(e) {
      this.isDetail = true;
      this.dataDetail = e;
    },
    onInput(e) {
      this.page = e;
      this.getData();
    },
  },
};
</script>
