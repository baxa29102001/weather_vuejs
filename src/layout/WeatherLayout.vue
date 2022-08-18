<template>
  <div class="weather_layout">
    <div class="container">
      <div class="weather_wrapper">
        <WeatherLayoutImage />
        <WeatherDescription />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import WeatherDescription from "../components/weatherDesc.vue";
  import WeatherLayoutImage from "../components/weatherLayout.vue";
  export default {
    components: {
      WeatherDescription,
      WeatherLayoutImage,
    },

    methods: {
      ...mapActions({
        fetchWeatherInfo: "weather/fetchWeatherInfo",
      }),
    },

    created() {
      this.fetchWeatherInfo("Tashkent");
    },
  };
</script>

<style scoped></style>
