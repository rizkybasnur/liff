<template>
  <v-row v-if="data?.data?.length">
    <v-col v-for="(item, i) in data.data" :key="i" cols="3">
      <div
        style="
          max-width: 100%;
          min-height: 100%;
          border: 1px solid black;
          border-radius: 12px;
          cursor: pointer;
        "
        @click="$emit('toggle', item)"
      >
        <video
          :src="item.url"
          alt=""
          disable
          width="100%"
          height="100%"
          style="border-radius: 12px 12px 0px 0px"
        />
        <div class="px-2 pb-1">
          {{ item.title }} ({{ item.duration }} Minutes)
        </div>
      </div>
    </v-col>
    <v-col cols="12" v-if="data.totalPages > 1">
      <v-pagination
        v-if="data"
        v-model="page"
        :length="data.totalPages"
        circle
        @input="onInput"
      ></v-pagination>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col class="text-center"> No Data </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    onInput(e) {
      this.$emit("page", e);
      this.page = e;
    },
  },
};
</script>
