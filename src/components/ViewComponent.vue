<template>
  <v-dialog v-if="isDialog" v-model="isDialog" width="500">
    <v-card>
      <v-card-title class="text-h5 lighten-2 align-center">
        {{ data.title }}
        <v-spacer></v-spacer>
        <div style="cursor: pointer" @click="isDialog = false">x</div>
      </v-card-title>

      <v-card-text class="pa-0">
        <video
          controls
          autoplay
          :src="data.url"
          alt=""
          width="100%"
          height="100%"
          class="pa-0 ma-0"
        ></video>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/plugins/axios";
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isDialog: this.value,
    };
  },

  mounted() {
    this.postCount();
  },

  methods: {
    postCount() {
      const payload = {
        id: this.data.id,
      };
      api
        .post("/updateViews", payload)
        .then(() => {})
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
