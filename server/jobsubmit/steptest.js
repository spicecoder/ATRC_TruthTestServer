const axios = require("axios");

axios
  .post("http://localhost:8080/mslist", {
    id: "apple services",
    command: "steptest",
    resolution: "lion resolution",
    userId: "60b0b5d851703802e8339620",
    truth: "python truthstatement",
  })
  .then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
