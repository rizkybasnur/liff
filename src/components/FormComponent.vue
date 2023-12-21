<template>
  <v-form ref="form" lazy-validation>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="search.title"
          outlined
          :rules="[(value) => !!value || '*wajib diisi.']"
          label="Title"
          placeholder="Title"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="search.duration"
          outlined
          :rules="[(value) => !!value || '*wajib diisi.']"
          label="Duration"
          placeholder="Duration"
          suffix="Minute"
          type="number"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="artistsValue"
          outlined
          :rules="[(value) => search.artists.length > 0 || '*wajib diisi.']"
          placeholder="Type and press Enter"
          @keydown.enter.prevent="addChip"
          label="Artists"
        ></v-text-field>

        <v-chip
          v-for="(chip, index) in search.artists"
          :key="index"
          close
          @input="removeChip(index)"
          class="mr-2"
        >
          {{ chip }}
        </v-chip>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="search.genres"
          outlined
          :rules="[(value) => value.length > 0 || '*wajib diisi.']"
          :items="items"
          item-text="text"
          item-value="value"
          label="Genres"
          persistent-hint
          multiple
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-textarea
          v-model="search.description"
          outlined
          :rules="[(value) => !!value || '*wajib diisi.']"
          label="Description"
          placeholder="Description"
        >
        </v-textarea>
      </v-col>
      <v-col cols="6">
        <input type="file" @change="uploadVideo" accept="video/*" />
        <v-progress-circular
          v-if="isLoading.upload"
          indeterminate
          color="red"
        ></v-progress-circular>
        <div v-if="search.url" class="d-flex flex-column mt-4">
          <video controls :src="search.url" />
          <a :href="search.url">Video Link</a>
        </div>
      </v-col>
      <v-col class="text-right">
        <v-btn @click="onSubmit">Submit</v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="isSnackbar" :timeout="timeout">
      {{ snackbarText }}
    </v-snackbar>
  </v-form>
</template>

<script>
import api from "@/plugins/axios";
import axios from "axios";

export default {
  props: {
    updateMode: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isSnackbar: false,
      snackbarText: "",
      timeout: "1000",
      artistsValue: "",
      videoLink: null,
      items: [
        { text: "Romance", value: "ROM" },
        { text: "Thriller", value: "THR" },
        { text: "Action", value: "ACT" },
        { text: "Comedy", value: "COM" },
      ],
      search: {
        title: "",
        duration: 0,
        artists: [],
        genres: [],
        description: "",
        url: "",
        views: 0,
      },
      isLoading: {
        upload: false,
      },
    };
  },
  mounted() {
    if (this.updateMode) {
      this.search = this.data;
    }
  },
  methods: {
    addChip() {
      if (this.artistsValue.trim() !== "") {
        this.search.artists.push(this.artistsValue.trim());
        this.artistsValue = "";
      }
    },
    removeChip(index) {
      this.search.artists.splice(index, 1);
    },
    onSubmit() {
      if (!this.$refs.form.validate()) return;
      if (!this.search.url) {
        this.isSnackbar = true;
        this.snackbarText = "Error: Video Not Uploaded";
        return;
      }

      const payload = this.search;
      const url = this.updateMode ? "/updateData" : "/saveData";
      api
        .post(url, payload)
        .then((response) => {
          this.isSnackbar = true;
          this.snackbarText = response.data.message;
          setTimeout(() => {
            this.$emit("success");
            this.search = {
              title: "",
              duration: 0,
              artists: [],
              genres: [],
              description: "",
              url: "",
              views: 0,
            };
          }, 1000);
        })
        .catch((error) => {
          this.isSnackbar = true;
          this.snackbarText = error;
        });
    },
    async uploadVideo(event) {
      const file = event.target.files[0];
      this.isLoading.upload = true;
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dsle5mlns/video/upload",
          formData
        );
        this.search.url = response.data.secure_url;
        this.isLoading.upload = false;
      } catch (error) {
        this.isLoading.upload = true;
        this.isSnackbar = true;
        this.snackbarText = error;
      }
    },
  },
};
</script>
