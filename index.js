//import * as createLedger from './dist/CreateLedger.js';
const createLedger = require("./dist/CreateLedger.js");
const insertDocument = require("./dist/InsertDocument.js");
const express = require("express");
const bodyParser = require("body-parser");
const connectToLedger = require("./dist/ConnectToLedger.js");
const aws = require("aws-sdk");
const qldbSdk = require("amazon-qldb-driver-nodejs");
const app = express();
var getApi = require("./get");

app.use("/get", getApi);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("this is a test");
});

app.post("/transformaciones", (req, res) => {
  var bichoLoco = aws.QLDB;
  createLedger
    .createLedger("LosTroncosDB", bichoLoco)
    .then(success => {
      findTransformaciones
        .findTransformaciones()
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

app.post("/empresa", (req, res) => {
  connectToLedger
    .createQldbSession()
    .then(success => {
      success.executeLambda(txn => {
        insertDocument
          .insertDocument(txn, "EMPRESAS", req.body)
          .then(success => {
            console.log(success);
            res.send(success);
            connectToLedger.closeQldbSession();
          })
          .catch(error => {
            console.log(error);
            res.send(error);
          });
      });
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

app.post("/errores", (req, res) => {
  let newErrores = req.body.errores;
  insertDocument
    .insertDocument({}, "ERRORES", newErrores)
    .then(success => {
      res.send(success.Name);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});
