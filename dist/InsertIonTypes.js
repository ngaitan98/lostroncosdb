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
var assert_1 = require("assert");
var ion_js_1 = require("ion-js");
var InsertDocument_1 = require("./InsertDocument");
var ConnectToLedger_1 = require("./ConnectToLedger");
var CreateTable_1 = require("./CreateTable");
var LogUtil_1 = require("./qldb/LogUtil");
var TABLE_NAME = "IonTypes";
/**
 * Delete a table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to delete.
 * @returns Promise which fulfills with void.
 */
function deleteTable(txn, tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var statement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LogUtil_1.log("Deleting " + tableName + " table...");
                    statement = "DROP TABLE " + tableName;
                    return [4 /*yield*/, txn.executeInline(statement)];
                case 1:
                    _a.sent();
                    LogUtil_1.log(tableName + " table successfully deleted.");
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteTable = deleteTable;
/**
 * Update a document's Name value in QLDB. Then, query the value of the Name key and verify the expected Ion type was
 * saved.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param parameters The IonValue to set the document's Name value to.
 * @param ionType The Ion type that the Name value should be.
 * @returns Promise which fulfills with void.
 */
function updateRecordAndVerifyType(txn, parameters, ionType) {
    return __awaiter(this, void 0, void 0, function () {
        var updateStatement, searchStatement, result, resultReaders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateStatement = "UPDATE " + TABLE_NAME + " SET Name = ?";
                    return [4 /*yield*/, txn.executeInline(updateStatement, parameters)];
                case 1:
                    _a.sent();
                    LogUtil_1.log("Updated record.");
                    searchStatement = "SELECT VALUE Name FROM " + TABLE_NAME;
                    return [4 /*yield*/, txn.executeInline(searchStatement)];
                case 2:
                    result = _a.sent();
                    resultReaders = result.getResultList();
                    if (0 === resultReaders.length) {
                        throw new assert_1.AssertionError({
                            message: "Did not find any values for the Name key."
                        });
                    }
                    resultReaders.forEach(function (reader) {
                        if (reader.next().binaryTypeId !== ionType.binaryTypeId) {
                            throw new assert_1.AssertionError({
                                message: "The queried value type, " + reader.type().name + ", does not match expected type, " + ionType.name + "."
                            });
                        }
                    });
                    LogUtil_1.log("Successfully verified value is of type " + ionType.name + ".");
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Insert all the supported Ion types into a table and verify that they are stored and can be retrieved properly,
 * retaining their original properties.
 * @returns Promise which fulfills with void.
 */
var main = function () {
    return __awaiter(this, void 0, void 0, function () {
        var ionNull, ionBool, ionInt, ionFloat32, ionFloat64, ionDecimal, ionTimestamp, ionSymbol, ionString, ionClob, ionBlob, ionList, ionSexp, ionStruct, session, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ionNull = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionNull.writeNull(ion_js_1.IonTypes.NULL);
                    ionBool = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionBool.writeBoolean(true);
                    ionInt = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionInt.writeInt(1);
                    ionFloat32 = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionFloat32.writeFloat32(3.2);
                    ionFloat64 = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionFloat64.writeFloat32(6.4);
                    ionDecimal = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionDecimal.writeDecimal(new ion_js_1.Decimal(1, -1));
                    ionTimestamp = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionTimestamp.writeTimestamp(new ion_js_1.Timestamp(0, 2000));
                    ionSymbol = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionSymbol.writeSymbol("abc123");
                    ionString = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionString.writeString("string");
                    ionClob = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionClob.writeClob(new Uint8Array());
                    ionBlob = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionBlob.writeBlob(new Uint8Array());
                    ionList = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionList.stepIn(ion_js_1.IonTypes.LIST);
                    ionList.writeInt(1);
                    ionList.stepOut();
                    ionSexp = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionSexp.stepIn(ion_js_1.IonTypes.SEXP);
                    ionSexp.writeInt(1);
                    ionSexp.stepOut();
                    ionStruct = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    ionStruct.stepIn(ion_js_1.IonTypes.STRUCT);
                    ionStruct.writeFieldName("brand");
                    ionStruct.writeString("Ford");
                    ionStruct.stepOut();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, ConnectToLedger_1.createQldbSession()];
                case 2:
                    session = _a.sent();
                    session.executeLambda(function (txn) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, CreateTable_1.createTable(txn, TABLE_NAME)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, InsertDocument_1.insertDocument(txn, TABLE_NAME, [{ "Name": "val" }])];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionNull], ion_js_1.IonTypes.NULL)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionBool], ion_js_1.IonTypes.BOOL)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionInt], ion_js_1.IonTypes.INT)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionFloat32], ion_js_1.IonTypes.FLOAT)];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionFloat64], ion_js_1.IonTypes.FLOAT)];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionDecimal], ion_js_1.IonTypes.DECIMAL)];
                                case 8:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionTimestamp], ion_js_1.IonTypes.TIMESTAMP)];
                                case 9:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionSymbol], ion_js_1.IonTypes.SYMBOL)];
                                case 10:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionString], ion_js_1.IonTypes.STRING)];
                                case 11:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionClob], ion_js_1.IonTypes.CLOB)];
                                case 12:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionBlob], ion_js_1.IonTypes.BLOB)];
                                case 13:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionList], ion_js_1.IonTypes.LIST)];
                                case 14:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionSexp], ion_js_1.IonTypes.SEXP)];
                                case 15:
                                    _a.sent();
                                    return [4 /*yield*/, updateRecordAndVerifyType(txn, [ionStruct], ion_js_1.IonTypes.STRUCT)];
                                case 16:
                                    _a.sent();
                                    return [4 /*yield*/, deleteTable(txn, TABLE_NAME)];
                                case 17:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    LogUtil_1.error("Error updating and validating Ion types: " + e_1);
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
