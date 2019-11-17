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
var Constants_1 = require("./qldb/Constants");
var LogUtil_1 = require("./qldb/LogUtil");
var pooledQldbDriver = createQldbDriver();
/**
 * Close a QLDB session object.
 * @param session The session to close.
 */
function closeQldbSession(session) {
    if (null != session) {
        session.close();
    }
}
exports.closeQldbSession = closeQldbSession;
/**
 * Create a pooled driver for creating sessions.
 * @param ledgerName The name of the ledger to create the driver on.
 * @param serviceConfigurationOptions The configurations for the AWS SDK client that the driver uses.
 * @returns The pooled driver for creating sessions.
 */
function createQldbDriver(ledgerName, serviceConfigurationOptions) {
    if (ledgerName === void 0) { ledgerName = Constants_1.LEDGER_NAME; }
    if (serviceConfigurationOptions === void 0) { serviceConfigurationOptions = {}; }
    var qldbDriver = new amazon_qldb_driver_nodejs_1.PooledQldbDriver(ledgerName, serviceConfigurationOptions);
    return qldbDriver;
}
exports.createQldbDriver = createQldbDriver;
/**
 * Retrieve a QLDB session object.
 * @returns Promise which fufills with a {@linkcode QldbSession} object.
 */
function createQldbSession() {
    return __awaiter(this, void 0, void 0, function () {
        var qldbSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pooledQldbDriver.getSession()];
                case 1:
                    qldbSession = _a.sent();
                    return [2 /*return*/, qldbSession];
            }
        });
    });
}
exports.createQldbSession = createQldbSession;
/**
 * Connect to a session for a given ledger using default settings.
 * @returns Promise which fulfills with void.
 */
var main = function () {
    return __awaiter(this, void 0, void 0, function () {
        var session, tableNames, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, createQldbSession()];
                case 2:
                    session = _a.sent();
                    LogUtil_1.log("Listing table names...");
                    return [4 /*yield*/, session.getTableNames()];
                case 3:
                    tableNames = _a.sent();
                    tableNames.forEach(function (tableName) {
                        LogUtil_1.log(tableName);
                    });
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _a.sent();
                    LogUtil_1.error("Unable to create session: " + e_1);
                    return [3 /*break*/, 6];
                case 5:
                    closeQldbSession(session);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
};
if (require.main === module) {
    main();
}
