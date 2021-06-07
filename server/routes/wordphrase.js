const Express = require("express");
const router = Express.Router();
const WordPhrase = require("../model/Wordphrase");

router.post("/post-wordphrase", async (req, res) => {
  const data = req.body;
  const Wordphrase = new WordPhrase({
    wp: data.wp,
  });
  Wordphrase.save()
    .then((response) => {
      res.send({ data: response });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get-wordphrase", async (req, res) => {
  WordPhrase.find().then((data) => {
    res.send(data);
  });
});

router.delete("/wordphrase/delete", async (req, res) => {
  const data = req.body;
  var id = data.id;
  var check = await WordPhrase.find({
    $and: [{ owner: data.owner }, { _id: id }],
  });
  if (check.length > 0) {
    WordPhrase.findByIdAndDelete({ _id: id }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send({ msg: "delete successfully" });
      }
    });
  } else {
    return res.send({ err: "you are not the owner to delete this phrase" });
  }
});

router.put("/wordphrase/update", async (req, res) => {
  const data = req.body;
  var id = data.id;
  WordPhrase.findById(id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs) {
        WordPhrase.findByIdAndUpdate(id, { wp: data.data }, { new: true })
          .then((response) => {
            res.json({ data: response });
          })
          .catch((err) => {
            res.send({ err: "Unable to update " });
          });
      } else {
        return res.send({ err: "no word phrase exist" });
      }
    }
  });
});

module.exports = router;
