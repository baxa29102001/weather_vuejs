<template>
  <div
    :class="`${
      main_data?.weather?.code >= 800 || !main_data.weather
        ? 'layout_container'
        : 'layout_container_rainy_image'
    }`"
  >
    <div
      :class="`${
        main_data ? '' : main_data?.weather?.code >= 800 ? '' : 'bg_opacity'
      }`"
    >
      <h2>the.weather</h2>
      <div class="weather_image">
        <img src="../assets/image/ballon-min.png" alt="Something" />
      </div>

      <div class="weather_details">
        <div class="weather_degree">
          <h1 v-if="weather_detail.status !== 'pending'">
            {{ main_data.app_temp }}
          </h1>
          <h1 v-else>--</h1>
          <div class="weather_degree_dot"></div>
        </div>
        <div class="weather_location_status_wrapper">
          <div class="weather_location">
            <h3 v-if="weather_detail.status !== 'pending'">
              {{ main_data.city_name }}
            </h3>
            <h3 v-else>Loading....</h3>

            <div v-if="weather_detail.status === 'pending'">
              <span>10:36</span> <span>-</span>
              <span>Sun, 2022 Oct 19</span>
            </div>
            <div v-else>
              <span>{{ day.time }}</span>
              <span> - </span>
              <span
                >{{ day.day }}, {{ day.year }} {{ day.month }}
                {{ day.date_num }}</span
              >
            </div>
          </div>
          <div class="weather_status">
            <img
              :src="`https://www.weatherbit.io/static/img/icons/${main_data?.weather?.icon}.png`"
              alt="Sunny"
            />

            <h3 v-if="weather_detail.status !== 'pending'">
              {{ main_data?.weather?.description }}
            </h3>
            <h3 v-else>loading...</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import { formatDate } from "@/lib/day";
  export default {
    data() {
      return {};
    },

    computed: {
      ...mapState({
        main_data: (state) => state.weather.weather_data,
        weather_detail: (state) => state.weather.details,
      }),

      day() {
        const { day, month, date_num, time, year } = formatDate(
          this.main_data.ob_time
        );

        return { day, month, date_num, time, year };
      },
    },
  };
</script>

<style scoped>
  .layout_container {
    width: 60%;
    background: rgb(255, 255, 255);
    background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, #67acdb 21%);
    padding: 20px 50px;
    position: relative;
  }

  .layout_container_rainy_image {
    padding: 20px 50px;
    background-image: url(../assets/image/real_bg_img.jpg);
    width: 60%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .bg_opacity {
    padding: 20px 50px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .layout_container,
  .layout_container_rainy_image h2 {
    color: white;
    font-size: 18px;
    /* margin-bottom: 40px; */
  }
  .weather_image {
    display: flex;
    justify-content: flex-end;
  }

  .weather_image img {
    width: 250px;
    height: 300px;
    margin-bottom: 50px;
  }
  .weather_details {
    display: flex;
    align-items: center;
    gap: 50px;
    margin-bottom: 80px;
  }

  .weather_details h1 {
    font-size: 90px;
    color: white;
  }

  .weather_degree {
    position: relative;
  }

  .weather_degree_dot {
    position: absolute;
    top: 16px;
    right: -28%;
    width: 25px;
    height: 25px;
    border: 5px solid #fff;
    background-color: transparent;
    border-radius: 100%;
  }
  .weather_location_status_wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .weather_location_status_wrapper h3 {
    font-size: 30px;
    color: white;
    margin-bottom: 5px;
  }
  .weather_location_status_wrapper span {
    color: white;
    font-size: 16px;
  }

  .weather_status {
    display: flex;
    flex-direction: column;
  }
  .weather_status img {
    flex: 1;
    width: 50px;
    height: 50px;
    display: block;
    margin: 0 auto;
  }

  .weather_status h3 {
    color: white;
    font-size: 16px;
  }

  @media (max-width: 425px) {
    .layout_container,
    .layout_container_rainy_image {
      width: 100%;
      padding: 6px 16px;
    }
    .weather_image img {
      width: 150px;
      height: 180px;
    }
    .weather_details h1 {
      font-size: 50px;
    }
    .weather_degree_dot {
      width: 15px;
      height: 15px;
      border-width: 2px;
      right: -30%;
      top: 0;
    }

    .weather_location_status_wrapper h3 {
      font-size: 25px;
    }
    .weather_status img {
      width: 30px;
      height: 30px;
    }
    .weather_status h3 {
      font-size: 14px;
    }
    .weather_location_status_wrapper span {
      font-size: 14px;
    }
  }

  @media (min-width: 425px) {
    .layout_container,
    .layout_container_rainy_image {
      width: 100%;
      padding: 6px 16px;
    }
  }
  @media (min-width: 768px) {
    .layout_container,
    .layout_container_rainy_image {
      width: 100%;
      padding: 20px 50px;
    }
  }

  @media (min-width: 1024px) {
    .layout_container,
    .layout_container_rainy_image {
      width: 60%;
    }
  }
</style>
