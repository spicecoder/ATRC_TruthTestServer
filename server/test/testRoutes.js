const Express = require("express");
const router = Express.Router();
const WordphraseCollection = require("../model/Wordphrase");
const DomainCollection = require("../model/Domain");
const ContextCollection = require("../model/Context");
const ResultCollection = require("../model/Result");
router.post("/mslist", async (req, res) => {
  try {
    const { id, command, resolution, userId, truth } = req.body;

    const domainId = await WordphraseCollection.findOne({ wp: id });
    const resId = await WordphraseCollection.findOne({ wp: resolution });

    const currenttime = Date.now();
    const dateOb = new Date(currenttime);
    const Hours = dateOb.getHours();
    const Minutes = dateOb.getMinutes();
    const Seconds = dateOb.getSeconds();

    const domain = `${domainId._id}$${resId._id}$${userId}`;
    const servicetesttime = `servicetest${Hours}${Minutes}${Seconds}`;
    if (command === "starttest") {
      const exist = await DomainCollection.exists({ domain: domain });
      if (exist)
        return res.status(400).json({ msg: "This domain already exists." });

      const newDomain = new DomainCollection({
        domain: domain,
        domainanchor: servicetesttime,
        owner: userId,
      });
      await newDomain.save();
      res.send({ msg: "domain saved successfully!" });
    } else if (command === "steptest") {
      const context = await ContextCollection.findOne({ domain: domain });
      const domainValue = await DomainCollection.findOne({ domain: domain });
      const truthstatement = await WordphraseCollection.findOne({ wp: truth });
      if (context === null) {
        const newContext = new ContextCollection({
          domain: domain,
          flow: domainValue.domainanchor,
          owner: userId,
          atttentionentities: truthstatement._id.toString(),
        });
        await newContext.save();
      } else {
        const len = context.atttentionentities.length;
        context.atttentionentities[len] = truthstatement._id.toString();
        context.domain = domain;
        context.flow = domainValue.domainanchor;
        context.owner = userId;
        const updatedContext = new ContextCollection(context);
        await updatedContext.save();
      }
      res.send({ msg: "entity sequence saved!" });
    } else if (command === "endtest") {
      const context1 = await ContextCollection.findOne({ domain: domain });
      const context2 = await ContextCollection.findOne({ domain: resId._id });

      var arr1 = context1.atttentionentities;
      var arr2 = context2.atttentionentities;
      function arrayEquals(a, b) {
        return (
          Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index])
        );
      }
      // msid,resolution,timestamp,expected,received,owner
      const domainValue = await DomainCollection.findOne({ domain: domain });

      const resobj = {
        msid: domainValue._id,
        resolution: resId._id,
        timestamp: domainValue.domainanchor,
        expected: arr2,
        received: arr1,
        owner: userId,
      };
      if (arrayEquals(arr1, arr2) === true) {
        res.send({ msg: "test successfull" });
        resobj.status = "success";
      } else {
        res.send({ msg: "test failed" });
        resobj.status = "failed";
      }
      const Result = new ResultCollection(resobj);
      Result.save()
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (command === "cleantest") {
      DomainCollection.deleteOne({ domain: domain }, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
      });
      ContextCollection.deleteOne({ domain: domain }, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
      });

      res.send({ msg: "cleaned db" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
module.exports = router;
