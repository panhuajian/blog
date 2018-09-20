import axios from "axios";

export default {
  axiosGet (api, callback) {
    axios.get(api)
      .then(callback)
      .catch(err => {
          console.log(err);
      })
  },
  axiosPost (api, post, callback) {
    axios.post(api, post)
      .then(callback)
      .catch(err => {
        console.log(err);
      })
  }
}