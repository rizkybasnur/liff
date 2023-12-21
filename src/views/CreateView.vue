<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12"><b>CREATE MOVIE</b></v-col>
    </v-row>
    <FormComponent />
  </v-container>
</template>

<script>
import FormComponent from "@/components/FormComponent.vue";

export default {
  components: { FormComponent },
  methods: {},
};
</script>
