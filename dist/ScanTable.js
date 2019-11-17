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
var ion_js_1 = require("ion-js");
var ConnectToLedger_1 = require("./ConnectToLedger");
var LogUtil_1 = require("./qldb/LogUtil");
/**
 * Pretty print the Readers in the provided result list.
 * @param resultList The result list containing the Readers to pretty print.
 */
function prettyPrintResultList(resultList) {
    var writer = ion_js_1.makePrettyWriter();
    resultList.forEach(function (reader) {
        writer.writeValues(reader);
    });
    LogUtil_1.log(ion_js_1.decodeUtf8(writer.getBytes()));
}
exports.prettyPrintResultList = prettyPrintResultList;
/**
 * Scan for all the documents in a table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName The name of the table to operate on.
 * @returns Promise which fulfills with a {@linkcode Result} object.
 */
function scanTableForDocuments(txn, tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LogUtil_1.log("Scanning " + tableName + "...");
                    query = "SELECT * FROM " + tableName;
                    return [4 /*yield*/, txn.executeInline(query).then(function (result) {
                            return result;
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.scanTableForDocuments = scanTableForDocuments;
/**
 * Retrieve the list of table names.
 * @param session The session to retrieve table names from.
 * @returns Promise which fulfills with a list of table names.
 */
function scanTables(session) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, session.getTableNames()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.scanTables = scanTables;
/**
 * Scan for all the documents in a table.
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
                    return [4 /*yield*/, scanTables(session).then(function (listofTables) { return __awaiter(_this, void 0, void 0, function () {
                            var _loop_1, _i, listofTables_1, tableName;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_1 = function (tableName) {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, session.executeLambda(function (txn) { return __awaiter(_this, void 0, void 0, function () {
                                                            var result;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, scanTableForDocuments(txn, tableName)];
                                                                    case 1:
                                                                        result = _a.sent();
                                                                        prettyPrintResultList(result.getResultList());
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _i = 0, listofTables_1 = listofTables;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < listofTables_1.length)) return [3 /*break*/, 4];
                                        tableName = listofTables_1[_i];
                                        return [5 /*yield**/, _loop_1(tableName)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, function () { return LogUtil_1.log("Retrying due to OCC conflict..."); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    LogUtil_1.log("Error displaying documents: " + e_1);
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
