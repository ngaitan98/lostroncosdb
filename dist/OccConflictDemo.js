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
 * Commit the transaction and retry up to a constant number of times.
 * @param session A QLDB session.
 * @param transaction An open transaction.
 * @param statement The query to execute.
 * @param parameter The paramater to use for the query.
 * @returns Promise which fulfills with void.
 */
function commitTransaction(session, transaction, statement, parameter) {
    return __awaiter(this, void 0, void 0, function () {
        var i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < Constants_1.RETRY_LIMIT)) return [3 /*break*/, 9];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 8]);
                    return [4 /*yield*/, transaction.commit()];
                case 3:
                    _a.sent();
                    LogUtil_1.log("Commit successful after " + i + " retries.");
                    return [3 /*break*/, 9];
                case 4:
                    e_1 = _a.sent();
                    if (!amazon_qldb_driver_nodejs_1.isOccConflictException(e_1)) return [3 /*break*/, 7];
                    LogUtil_1.log("Commit on transaction failed due to an OCC conflict. Restarting transaction...");
                    return [4 /*yield*/, session.startTransaction()];
                case 5:
                    transaction = _a.sent();
                    return [4 /*yield*/, executeTransaction(session, transaction, statement, parameter)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 8];
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
/**
 * Execute statement. If it was unsuccessful, retry with a new transaction.
 * @param session A QLDB session.
 * @param transaction An open transaction.
 * @param statement The query to execute.
 * @param parameter The paramater to use for the query.
 * @returns Promise which fulfills with void.
 */
function executeTransaction(session, transaction, statement, parameter) {
    return __awaiter(this, void 0, void 0, function () {
        var i, qldbWriter, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < Constants_1.RETRY_LIMIT)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 7]);
                    qldbWriter = amazon_qldb_driver_nodejs_1.createQldbWriter();
                    Util_1.writeValueAsIon(parameter, qldbWriter);
                    return [4 /*yield*/, transaction.executeInline(statement, [qldbWriter])];
                case 3:
                    _a.sent();
                    LogUtil_1.log("Execute successful after " + i + " retries.");
                    return [3 /*break*/, 8];
                case 4:
                    e_2 = _a.sent();
                    if (!amazon_qldb_driver_nodejs_1.isOccConflictException(e_2)) return [3 /*break*/, 6];
                    LogUtil_1.log("Transaction execution failed due to an OCC conflict. Restart transaction.");
                    return [4 /*yield*/, session.startTransaction()];
                case 5:
                    transaction = _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 7];
                case 7:
                    i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Demonstrates how to handle OCC conflicts, where two users try to execute and commit changes to the same document.
 * When OCC conflict occurs on execute or commit, implicitly handled by restarting the transaction.
 * In this example, two sessions on the same ledger try to access the registration city for the same Vehicle Id.
 * @returns Promise which fulfills with void.
 */
var main = function () {
    return __awaiter(this, void 0, void 0, function () {
        var session1, session2, t1_1, t2_1, vehicleVin_1, statement1_1, statement2_1, e_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 8]);
                    return [4 /*yield*/, ConnectToLedger_1.createQldbSession()];
                case 1:
                    session1 = _a.sent();
                    return [4 /*yield*/, ConnectToLedger_1.createQldbSession()];
                case 2:
                    session2 = _a.sent();
                    return [4 /*yield*/, session1.startTransaction()];
                case 3:
                    t1_1 = _a.sent();
                    return [4 /*yield*/, session2.startTransaction()];
                case 4:
                    t2_1 = _a.sent();
                    vehicleVin_1 = SampleData_1.VEHICLE_REGISTRATION[0].VIN;
                    statement1_1 = "UPDATE VehicleRegistration AS r SET r.City = 'Tukwila' WHERE r.VIN = ?";
                    statement2_1 = "SELECT * FROM VehicleRegistration AS r WHERE r.VIN = ?";
                    LogUtil_1.log("Updating the registration city on transaction 1...");
                    LogUtil_1.log("Selecting the registrations on transaction 2...");
                    LogUtil_1.log("Executing transaction 1");
                    LogUtil_1.log("Executing transaction 2");
                    return [4 /*yield*/, Promise.all([
                            executeTransaction(session1, t1_1, statement1_1, vehicleVin_1),
                            executeTransaction(session2, t2_1, statement2_1, vehicleVin_1)
                        ]).then(function (values) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        LogUtil_1.log("Committing transaction 1...");
                                        LogUtil_1.log("Committing transaction 2...");
                                        return [4 /*yield*/, Promise.all([
                                                commitTransaction(session1, t1_1, statement1_1, vehicleVin_1),
                                                // The first attempt to commit on t2 will fail due to an OCC conflict.
                                                commitTransaction(session2, t2_1, statement2_1, vehicleVin_1)
                                            ])];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    e_3 = _a.sent();
                    LogUtil_1.error("Unable to execute or commit transactions: " + e_3);
                    return [3 /*break*/, 8];
                case 7:
                    ConnectToLedger_1.closeQldbSession(session1);
                    ConnectToLedger_1.closeQldbSession(session2);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
};
if (require.main === module) {
    main();
}
