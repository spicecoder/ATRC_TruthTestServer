const Express = require("express");
const router = Express.Router();
const DomainAnchor = require("../model/DomainAnchor");

router.post("/post-domain-anchor", async (req, res) => {
  //   const data = req.body;
  const DomainAnchors = new DomainAnchor({
    anchor: "microservice",
  });
  DomainAnchors.save()
    .then((response) => {
      res.send({ data: response });
    })
    .catch((err) => {
      if (error.name === "MongoError" && error.code === 11000) {
        res.send({ err: "duplicate resolution pattern" });
      }
    });
});

router.get("/get-domain-anchor", async (req, res) => {
  DomainAnchor.find().then((data) => {
    res.send(data);
  });
});

module.exports = router;
