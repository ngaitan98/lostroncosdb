var express = require("express");
var router = express.Router();
const insertDocument = require("./dist/InsertDocument.js");
const bodyParser = require("body-parser");
const connectToLedger = require("./dist/ConnectToLedger.js");
const util = require('./dist/qldb/Util.js');
const qldbSdk = require("amazon-qldb-driver-nodejs");

router.get("/:id", (req, res) => {
  let id = req.params.id
  connectToLedger
  .createQldbSession()
  .then(success => {
    success.executeLambda((txn) =>{
      let documentWriter = qldbSdk.createQldbWriter()
      util.writeValueAsIon(id,documentWriter)
      txn.executeInline("SELECT * as bloque FROM TRANSFORMACIONES WHERE bloque.id = ?",[documentWriter]).then(success=>{
        res.send(success.getResultList().length == 1?success.getResultList()[0]:"Error");
      }).catch(error=>{
        console.log(error);
        res.send(error)
      });
    });
  });
});


module.exports = router;
