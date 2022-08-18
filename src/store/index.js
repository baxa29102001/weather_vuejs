import Vue from "vue";
import Vuex from "vuex";
import request from "../lib/request";
import weather from "./weather";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    weather: weather,
  },
});

store.$axios = request;

export default store;
