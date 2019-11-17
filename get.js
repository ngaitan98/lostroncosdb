var express = require("express");
var router = express.Router();

router.get("/:id", (req, res) => {
  let id = req.params.id
  createLedger
    .createLedger("LosTroncosDB", bichoLoco)
    .then(success => {
      res.send(success.Name);
    })
    .catch(error => {
      res.send(error);
    });
});


module.exports = router;
