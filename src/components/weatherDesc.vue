<template>
  <div
    :class="
      (main_data && main_data?.weather?.code >= 800) || !main_data.weather
        ? 'weather_desc_layout'
        : 'weather_desc_layout weather_desc_layout_rainy'
    "
  >
    <form class="weather_search_form">
      <input
        type="text"
        class="weather_desc_input"
        placeholder="Another location"
        v-model="searchInput"
        @input="debounceInput"
      />
    </form>

    <ul class="weather_cities">
      <li v-for="item in cities" :key="item" @click="chooseCity(item)">
        {{ item }}
      </li>
    </ul>

    <hr />

    <div class="weather_details">
      <h2>Weather Details</h2>
      <div
        v-for="(item, index) in weather_details"
        :key="index"
        class="weather_mini_detail"
      >
        <h3>{{ item.name }}</h3>
        <p>
          {{ weather_detail.status === "pending" ? "-" : main_data[item.key] }}
          {{ item.degree }}
        </p>
      </div>
    </div>
    <hr />

    <button type="button" class="weather_search_icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="#fffff"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  // import { debounce } from "@/lib/debounce";
  const cities_s = [
    "Qarshi",
    "Samarqand",
    "Guliston",
    "Buxoro",
    "Nukus",
    "Qo'qon",
    "Termiz",
  ];
  const weather_details = [
    {
      name: "Cloudy",
      degree: "%",
      key: "clouds",
    },
    {
      name: "Humidity",
      degree: "%",
      key: "rh",
    },
    {
      name: "Wind",
      degree: "km/h",
      key: "wind_spd",
    },
    {
      name: "Rain",
      degree: "mm",
      key: "snow",
    },
  ];
  export default {
    data() {
      return {
        weather_details,
        cities_s,
        searchInput: "",
      };
    },

    computed: {
      cities() {
        return this.cities_s.slice(0, 4);
      },

      ...mapState({
        main_data: (state) => state.weather.weather_data,
        weather_detail: (state) => state.weather.details,
      }),
    },

    methods: {
      ...mapActions({
        fetchWeatherInfo: "weather/fetchWeatherInfo",
      }),

      debounceInput() {
        setTimeout(() => {
          this.fetchWeatherInfo(this.searchInput || "Tashkent");
        }, 1000);
      },

      chooseCity(item) {
        this.fetchWeatherInfo(item);
        const newArr = this.cities_s.filter((i) => i !== item);
        this.cities_s = [...newArr, item];
      },
    },
  };
</script>

<style scoped>
  .weather_desc_layout {
    width: 40%;
    background-color: #4e718b;
    padding: 40px;
    position: relative;
  }

  .weather_desc_layout_rainy {
    background-color: rgba(79, 103, 100, 0.5);
  }
  /* rgba(79, 103, 100, 0.5) */
  .weather_desc_layout hr {
    border: 1px solid #95adc0;
    background-color: #95adc0;
  }
  .weather_search_form {
    margin-bottom: 40px;
  }

  .weather_search_form input {
    width: 80%;
    padding: 15px 3px;
    border: none;
    border-bottom: 1px solid #95adc0;
    background-color: transparent;
    outline: none;
    color: white;
    /* font-size: 16px; */
  }
  .weather_search_form input::placeholder {
    color: #95adc0;
  }

  .weather_cities {
    width: 100%;
    list-style: none;
    margin-bottom: 50px;
  }

  .weather_cities li {
    margin-bottom: 25px;
    color: #95adc0;
    letter-spacing: 1px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
  .weather_details {
    margin-bottom: 40px;
  }

  .weather_details h2 {
    color: white;
    margin-top: 50px;
    margin-bottom: 40px;
  }
  .weather_mini_detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .weather_mini_detail h3 {
    color: #95adc0;
    font-size: 18px;
    font-weight: normal;
  }
  .weather_mini_detail p {
    color: white;
    font-size: 18px;
  }

  .weather_search_icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    background: #a9cee1;
    padding: 30px;
    border: none;
  }

  .mini_toolbar {
    width: 100%;
    background-color: #4e718b;
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 320px) {
    .weather_desc_layout {
      width: 100%;
    }
  }

  @media (min-width: 1024px) {
    .weather_desc_layout {
      width: 40%;
    }
  }
</style>
