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
var aws_sdk_1 = require("aws-sdk");
var ion_js_1 = require("ion-js");
var util_1 = require("util");
var DescribeJournalExport_1 = require("./DescribeJournalExport");
var ExportJournal_1 = require("./ExportJournal");
var Constants_1 = require("./qldb/Constants");
var JournalS3ExportReader_1 = require("./qldb/JournalS3ExportReader");
var LogUtil_1 = require("./qldb/LogUtil");
var Verifier_1 = require("./qldb/Verifier");
var s3Client = new aws_sdk_1.S3();
/**
 * Compare the hash values on the given journal blocks.
 * @param previousJournalBlock Previous journal block in the chain.
 * @param journalBlock Current journal block in the chain.
 * @returns The current journal block in the chain.
 */
function compareJournalBlocks(previousJournalBlock, journalBlock) {
    if (previousJournalBlock === undefined) {
        return journalBlock;
    }
    if (ion_js_1.toBase64(previousJournalBlock._blockHash) !== ion_js_1.toBase64(journalBlock._previousBlockHash)) {
        throw new Error("Previous block hash does not match!");
    }
    var blockHash = Verifier_1.joinHashesPairwise(journalBlock._entriesHash, previousJournalBlock._blockHash);
    if (ion_js_1.toBase64(blockHash) !== ion_js_1.toBase64(journalBlock._blockHash)) {
        throw new Error("Block hash doesn't match expected block hash. Verification failed.");
    }
    return journalBlock;
}
/**
 * Export journal contents to a S3 bucket.
 * @param qldbClient The QLDB control plane client to use.
 * @returns The ExportId for the journal export.
 */
function createJournalExport(qldbClient) {
    return __awaiter(this, void 0, void 0, function () {
        var sts, request, identity, bucketName, prefix, exportJournalToS3Result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sts = new aws_sdk_1.STS();
                    request = {};
                    return [4 /*yield*/, sts.getCallerIdentity(request).promise()];
                case 1:
                    identity = _a.sent();
                    bucketName = util_1.format('%s-%s', Constants_1.JOURNAL_EXPORT_S3_BUCKET_NAME_PREFIX, identity.Account);
                    prefix = util_1.format('%s-%s', Constants_1.LEDGER_NAME, Date.now().toString());
                    return [4 /*yield*/, ExportJournal_1.createS3BucketIfNotExists(bucketName, s3Client)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ExportJournal_1.createExportAndWaitForCompletion(Constants_1.LEDGER_NAME, bucketName, prefix, ExportJournal_1.setUpS3EncryptionConfiguration(null), null, qldbClient)];
                case 3:
                    exportJournalToS3Result = _a.sent();
                    return [2 /*return*/, exportJournalToS3Result.ExportId];
            }
        });
    });
}
/**
 * Validate that the chain hash on the journal block is valid.
 * @param journalBlocks A list of journal blocks.
 * @returns None if the given list of journal blocks is empty.
 */
function verify(journalBlocks) {
    if (journalBlocks.length === 0) {
        return;
    }
    journalBlocks.reduce(compareJournalBlocks);
}
/**
 * Validate the hash chain of a QLDB ledger by stepping through its S3 export.
 * This code accepts an exportID as an argument, if exportID is passed the code
 * will use that or request QLDB to generate a new export to perform QLDB hash
 * chain validation.
 * @returns Promise which fulfills with void.
 */
var main = function () {
    return __awaiter(this, void 0, void 0, function () {
        var qldbClient, exportId, journalExport, journalBlocks, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    qldbClient = new aws_sdk_1.QLDB();
                    exportId = void 0;
                    if (!(process.argv.length === 3)) return [3 /*break*/, 1];
                    exportId = process.argv[2].toString();
                    LogUtil_1.log("Validating QLDB hash chain for ExportId: " + exportId + ".");
                    return [3 /*break*/, 3];
                case 1:
                    LogUtil_1.log("Requesting QLDB to create an export.");
                    return [4 /*yield*/, createJournalExport(qldbClient)];
                case 2:
                    exportId = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, DescribeJournalExport_1.describeJournalExport(Constants_1.LEDGER_NAME, exportId, qldbClient)];
                case 4:
                    journalExport = (_a.sent()).ExportDescription;
                    return [4 /*yield*/, JournalS3ExportReader_1.readExport(journalExport, s3Client)];
                case 5:
                    journalBlocks = _a.sent();
                    verify(journalBlocks);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    LogUtil_1.error("Unable to perform hash chain verification: " + e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
if (require.main === module) {
    main();
}
