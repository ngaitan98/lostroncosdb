//import * as createLedger from './dist/CreateLedger.js';
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
  console.log(req.body);
  connectToLedger
    .createQldbSession()
    .then(success => {
      success.executeLambda(txn => {
        insertDocument
          .insertDocument(txn, "TRANSFORMACIONES", req.body)
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

app.post("/empresas", (req, res) => {
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
  connectToLedger
    .createQldbSession()
    .then(success => {
      success.executeLambda(txn => {
        insertDocument
          .insertDocument(txn, "ERRORES", req.body)
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
app.post("/hijos", (req, res) => {
  connectToLedger
    .createQldbSession()
    .then(success => {
      success.executeLambda(txn => {
        insertDocument
          .insertDocument(txn, "HIJOS", req.body)
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