const axios = require("axios");

// { command :"starttest", "msid":"apple services" ,"resolution":"lion resolution',userId:"60b0b5d851703802e8339620"}
axios
  .post("http://localhost:8080/mslist", {
    id: "apple services",
    command: "endtest",
    resolution: "lion resolution",
    userId: "60b0b5d851703802e8339620",
  })
  .then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
