"use strict";
/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var amazon_qldb_driver_nodejs_1 = require("amazon-qldb-driver-nodejs");
var ConnectToLedger_1 = require("./ConnectToLedger");
var SampleData_1 = require("./model/SampleData");
var Constants_1 = require("./qldb/Constants");
var LogUtil_1 = require("./qldb/LogUtil");
var Util_1 = require("./qldb/Util");
/**
 * Insert the given list of documents into a table in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to insert documents into.
 * @param documents List of documents to insert.
 * @returns Promise which fulfills with a {@linkcode Result} object.
 */
function insertDocument(txn, tableName, documents) {
    return __awaiter(this, void 0, void 0, function () {
        var statement, documentsWriter, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statement = "INSERT INTO " + tableName + " ?";
                    documentsWriter = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    Util_1.writeValueAsIon(documents, documentsWriter);
                    return [4 /*yield*/, txn.executeInline(statement, [documentsWriter])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.insertDocument = insertDocument;
/**
 * Handle the insertion of documents and updating PersonIds all in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @returns Promise which fulfills with void.
 */
function updateAndInsertDocuments(txn) {
    return __awaiter(this, void 0, void 0, function () {
        var documentIds, listOfDocumentIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LogUtil_1.log("Inserting multiple documents into the 'Person' table...");
                    return [4 /*yield*/, insertDocument(txn, Constants_1.PERSON_TABLE_NAME, SampleData_1.PERSON)];
                case 1:
                    documentIds = _a.sent();
                    listOfDocumentIds = documentIds.getResultList();
                    LogUtil_1.log("Updating PersonIds for 'DriversLicense' and PrimaryOwner for 'VehicleRegistration'...");
                    updatePersonId(listOfDocumentIds);
                    LogUtil_1.log("Inserting multiple documents into the remaining tables...");
                    return [4 /*yield*/, Promise.all([
                            insertDocument(txn, Constants_1.DRIVERS_LICENSE_TABLE_NAME, SampleData_1.DRIVERS_LICENSE),
                            insertDocument(txn, Constants_1.VEHICLE_REGISTRATION_TABLE_NAME, SampleData_1.VEHICLE_REGISTRATION),
                            insertDocument(txn, Constants_1.VEHICLE_TABLE_NAME, SampleData_1.VEHICLE)
                        ])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Update the PersonId value for DriversLicense records and the PrimaryOwner value for VehicleRegistration records.
 * @param documentIds List of document IDs.
 */
function updatePersonId(documentIds) {
    documentIds.forEach(function (reader, i) {
        var documentId = Util_1.getFieldValue(reader, ["documentId"]);
        SampleData_1.DRIVERS_LICENSE[i].PersonId = documentId;
        SampleData_1.VEHICLE_REGISTRATION[i].Owners.PrimaryOwner.PersonId = documentId;
    });
}
exports.updatePersonId = updatePersonId;
/**
 * Insert documents into a table in a QLDB ledger.
 * @returns Promise which fulfills with void.
 */
var main = function () {
    return __awaiter(this, void 0, void 0, function () {
        var session, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, ConnectToLedger_1.createQldbSession()];
                case 1:
                    session = _a.sent();
                    return [4 /*yield*/, session.executeLambda(function (txn) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, updateAndInsertDocuments(txn)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function () { return LogUtil_1.log("Retrying due to OCC conflict..."); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    LogUtil_1.error("Unable to insert documents: " + e_1);
                    return [3 /*break*/, 5];
                case 4:
                    ConnectToLedger_1.closeQldbSession(session);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
};
if (require.main === module) {
    main();
}
