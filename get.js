var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  var bichoLoco = aws;
  createLedger
    .createLedger("LosTroncosDB", bichoLoco)
    .then(success => {
      res.send(success.Name);
    })
    .catch(error => {
      res.send(error);
    });
});

router.get("/hijos", (req, res) => {
  var bichoLoco = aws.QLDB;
  createLedger
    .createLedger("LosTroncosDB", bichoLoco)
    .then(success => {
      findHijos
        .findHijos()
        .then(success => {
          res.send(success.Name);
        })
        .catch(error => {
          res.send(error);
        });
    })
    .catch(error => {
      res.send(error);
    });
});

router.get("/errores", (req, res) => {
  let qldb = undefined;
  createLedger
    .createLedger("LosTroncosDB", qldb)
    .then(success => {
      findErrores
        .findErrores()
        .then(success => {
          res.send(success.Name);
        })
        .catch(error => {
          res.send(error);
        });
    })
    .catch(error => {
      res.send(error);
    });
});
module.exports = router;
