const Express = require("express");
const router = Express.Router();
const Context = require("../model/Context");
const WordPhrase = require("../model/Wordphrase");

router.get("/post-resolution-pattern", async (req, res) => {
  const data = JSON.parse(req.query.payload);
  if (data.owner !== undefined) {
    var word = await getIds(data.domain);
    Context.findOne(
      { domain: word._id, flow: data.flow },
      async (err, docs) => {
        if (err) {
        } else {
          if (docs === null) {
            const RP = new Context({
              domain: word._id,
              flow: data.flow,
              owner: data.owner,
            });
            RP.save()
              .then(async (doc) => {
                const domainValue = await getWpByID(doc.domain);
                doc.domain = domainValue.wp;
                res.send({ data: doc });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            var arr = [];
            for (let i of docs.atttentionentities) {
              var wp = await getWpByID(i);
              arr.push(wp.wp);
            }
            const domainValue = await getWpByID(docs.domain);
            docs.domain = domainValue.wp;
            docs.atttentionentities = arr;
            res.send({ data: docs });
          }
        }
      }
    );
  } else {
    res.send({ err: "please log in" });
  }
});
router.put("/add-resolution-pattern", async (req, res) => {
  const wp = await getIds(req.body.rp);
  const checkContext = await Context.find({
    $and: [{ owner: req.body.owner }, { _id: req.body.id }],
  });

  if (checkContext.length > 0) {
    Context.findOne({ _id: req.body.id }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (!docs.atttentionentities.includes(wp._id.toString())) {
          docs.atttentionentities.push(wp._id.toString());
        }
        const updatedRP = new Context(docs);
        updatedRP
          .save()
          .then((response) => {
            res.send({ data: response });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    res.send({ err: "only owner can modify!" });
  }
});
router.put("/update-entity", async (req, res) => {
  const checkContext = await Context.find({
    $and: [{ owner: req.body.owner }, { _id: req.body.id }],
  });
  if (checkContext.length > 0) {
    const oldwp = await getIds(req.body.oe);
    const newwp = await getIds(req.body.ne);
    Context.findOne({ _id: req.body.id }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (oldwp !== null) {
          const index = docs.atttentionentities.indexOf(oldwp._id.toString());
          docs.atttentionentities[index] = newwp._id.toString();
        }
        const updatedRP = new Context(docs);
        updatedRP
          .save()
          .then((response) => {
            res.send({ data: response });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    res.send({ err: "only owner can modify!" });
  }
});
router.delete("/remove-entity", async (req, res) => {
  const checkContext = await Context.find({
    $and: [{ owner: req.body.owner }, { _id: req.body.id }],
  });
  if (checkContext.length > 0) {
    const wp = await getIds(req.body.entity);
    Context.findById(req.body.id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        const index = docs.atttentionentities.indexOf(wp._id.toString());
        docs.atttentionentities.splice(index, 1);
        const updatedRP = new Context(docs);
        updatedRP
          .save()
          .then((response) => {
            res.send({ data: response });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    res.send({ err: "only owner can modify!" });
  }
});

module.exports = router;
function getIds(d) {
  return WordPhrase.findOne({ wp: d });
}

function getWpByID(data) {
  return WordPhrase.findById(data).then((res) => {
    return res;
  });
}
