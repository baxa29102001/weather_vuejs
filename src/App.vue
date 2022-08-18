<template>
  <div>
    <weather-layout></weather-layout>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import WeatherLayout from "./layout/WeatherLayout.vue";
  export default {
    name: "App",
    components: {
      WeatherLayout,
    },
    computed: {
      ...mapState({
        main_data: (state) => state.weather.weather_data,
      }),
    },

    watch: {
      main_data() {
        if (!this.main_data.weather) {
          document.body.style.backgroundColor = "#4a99d3";
          return;
        }
        if (this.main_data?.weather?.code >= 800) {
          document.body.style.backgroundColor = "#4a99d3";
        } else {
          document.body.style.backgroundColor = "#0d0d0d";
        }
      },
    },
  };
</script>
