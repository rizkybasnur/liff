<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12"><b>VIEWS</b></v-col>
    </v-row>
    <v-row>
      <v-col>
        <div id="chart" v-if="data">
          <div class="center-chart">
            <apex-chart type="bar" :options="chartOptions" :series="series">
            </apex-chart>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";

export default {
  data() {
    return {
      data: [],
      series: [{ data: [] }],
      chartOptions: {
        chart: {
          type: "bar",
          height: 400,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [],
        },
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api
        .get("/views")
        .then((response) => {
          this.data = response.data;
          this.series[0].data = response.data.views;
          this.chartOptions = {
            ...this.chartOptions,
            xaxis: { categories: this.data.title },
          };
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>
