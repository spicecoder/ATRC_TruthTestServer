const Express = require("express");
const router = Express.Router();
const Domain = require("../model/Domain");
const WordPhrase = require("../model/Wordphrase");
const DomainAnchor = require("../model/DomainAnchor");

router.post("/post-domain-anchor", async (req, res) => {
  const domainanchor = await DomainAnchor.find({});
  var DA;
  if (domainanchor.length === 0 || req.body.domainanchor === "Domain") {
    var checkExistence = await DomainAnchor.findOne({
      anchor: "microservices",
    });

    if (!checkExistence) {
      const DomainAnchorObject = new DomainAnchor({
        anchor: "microservices",
      });

      DA = await DomainAnchorObject.save();
    } else {
      DA = checkExistence;
    }
  } else {
    DA = await getDAIds(req.body.domainanchor);
  }
  const wp = await getIds(req.body.domain);

  const Domains = new Domain({
    domainanchor: DA._id.toString(),
    domain: wp._id.toString(),
    owner: req.body.owner,
  });

  Domains.save()
    .then((response) => {
      res.send({ data: response });
    })
    .catch((error) => {
      if (error.name === "MongoError" && error.code === 11000) {
        res.send({ err: "duplicate resolution pattern" });
      }
    });
});

router.get("/get-domain", async (req, res) => {
  const arr = [];
  const data = await Domain.find({});
  var setDomain;
  for (let i of data) {
    if (i.domain.length < 30) {
      var D = await getDomainByID(i.domainanchor);
      setDomain = D.anchor;
      var wp = await getWpByID(i.domain);
    } else {
      setDomain = i.domainanchor;
      wp._id = i.domain;
      wp.wp = i.domain;
    }

    var obj = { domain: setDomain, domainanchor: wp.wp, _id: i._id };
    arr.push(obj);
  }
  res.send(arr);
});

router.delete("/delete-domain", async (req, res) => {
  var checkData = await Domain.find({
    $and: [{ owner: req.body.owner }, { _id: req.body.id }],
  });
  if (checkData.length > 0) {
    Domain.findByIdAndDelete(req.body.id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send({ data: docs });
      }
    });
  } else {
    res.send({ error: "only owner can delete" });
  }
});

router.put("/update-domain", async (req, res) => {
  const wp = await getIds(req.body.wp);
  const checkDomain = await Domain.find({
    $and: [{ owner: req.body.owner }, { _id: req.body.id }],
  });
  if (checkDomain.length > 0) {
    Domain.findByIdAndUpdate(
      req.body.id,
      { domain: wp._id },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.send({ data: docs });
        }
      }
    );
  } else {
    res.send({ error: "only owner can update" });
  }
});

module.exports = router;

function getIds(d) {
  return WordPhrase.findOne({ wp: d });
}
function getDAIds(d) {
  return DomainAnchor.findOne({ anchor: d });
}

function getDomainByID(data) {
  return DomainAnchor.findById(data).then((res) => {
    return res;
  });
}

function getWpByID(data) {
  return WordPhrase.findById(data).then((res) => {
    return res;
  });
}
