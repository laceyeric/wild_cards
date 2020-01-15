import axios from "axios";
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});
export default {
  actions: {
    async getProfileById({ commit, dispatch }, id) {
      try {
        let res = await api.get("profile/" + id);
        commit("setResource", { name: "activeProfile", data: res.data });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
