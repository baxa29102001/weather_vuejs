import request from "@/lib/request";
const state = () => ({
  weather_data: {},
  details: {
    error: null,
    status: null,
  },
});

const mutations = {
  setLoadData(state, payload) {
    state.weather_data = payload.weather_data;
    state.details.error = payload.details.error;
    state.details.status = payload.details.status;
  },
};

const actions = {
  fetchWeatherInfo({ commit }, city) {
    commit("setLoadData", {
      weather_data: {},
      details: {
        error: null,
        status: "pending",
      },
    });
    request
      .get("", {
        params: {
          city,
        },
      })
      .then(({ data }) => {
        console.log(data.data[0]);
        commit("setLoadData", {
          weather_data: data.data[0] || {},
          details: {
            error: null,
            status: "success",
          },
        });
      })
      .catch((error) => {
        commit("setLoadData", {
          weather_data: {},
          details: {
            error: error,
            status: "error",
          },
        });
      });
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
