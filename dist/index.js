"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddSecondaryOwner_1 = require("./AddSecondaryOwner");
exports.addSecondaryOwner = AddSecondaryOwner_1.addSecondaryOwner;
exports.getDocumentIdByGovId = AddSecondaryOwner_1.getDocumentIdByGovId;
exports.isSecondaryOwnerForVehicle = AddSecondaryOwner_1.isSecondaryOwnerForVehicle;
var ConnectToLedger_1 = require("./ConnectToLedger");
exports.closeQldbSession = ConnectToLedger_1.closeQldbSession;
exports.createQldbDriver = ConnectToLedger_1.createQldbDriver;
exports.createQldbSession = ConnectToLedger_1.createQldbSession;
var Constants_1 = require("./qldb/Constants");
exports.DRIVERS_LICENSE_TABLE_NAME = Constants_1.DRIVERS_LICENSE_TABLE_NAME;
exports.GOV_ID_INDEX_NAME = Constants_1.GOV_ID_INDEX_NAME;
exports.JOURNAL_EXPORT_S3_BUCKET_NAME_PREFIX = Constants_1.JOURNAL_EXPORT_S3_BUCKET_NAME_PREFIX;
exports.LEDGER_NAME = Constants_1.LEDGER_NAME;
exports.LEDGER_NAME_WITH_TAGS = Constants_1.LEDGER_NAME_WITH_TAGS;
exports.LICENSE_NUMBER_INDEX_NAME = Constants_1.LICENSE_NUMBER_INDEX_NAME;
exports.LICENSE_PLATE_NUMBER_INDEX_NAME = Constants_1.LICENSE_PLATE_NUMBER_INDEX_NAME;
exports.PERSON_ID_INDEX_NAME = Constants_1.PERSON_ID_INDEX_NAME;
exports.PERSON_TABLE_NAME = Constants_1.PERSON_TABLE_NAME;
exports.RETRY_LIMIT = Constants_1.RETRY_LIMIT;
exports.USER_TABLES = Constants_1.USER_TABLES;
exports.VEHICLE_REGISTRATION_TABLE_NAME = Constants_1.VEHICLE_REGISTRATION_TABLE_NAME;
exports.VEHICLE_TABLE_NAME = Constants_1.VEHICLE_TABLE_NAME;
exports.VIN_INDEX_NAME = Constants_1.VIN_INDEX_NAME;
var CreateIndex_1 = require("./CreateIndex");
exports.createIndex = CreateIndex_1.createIndex;
var CreateLedger_1 = require("./CreateLedger");
exports.createLedger = CreateLedger_1.createLedger;
exports.waitForActive = CreateLedger_1.waitForActive;
var CreateTable_1 = require("./CreateTable");
exports.createTable = CreateTable_1.createTable;
var DeleteLedger_1 = require("./DeleteLedger");
exports.deleteLedger = DeleteLedger_1.deleteLedger;
exports.waitForDeleted = DeleteLedger_1.waitForDeleted;
var DeletionProtection_1 = require("./DeletionProtection");
exports.setDeletionProtection = DeletionProtection_1.setDeletionProtection;
var DeregisterDriversLicense_1 = require("./DeregisterDriversLicense");
exports.deregisterDriversLicense = DeregisterDriversLicense_1.deregisterDriversLicense;
var DescribeJournalExport_1 = require("./DescribeJournalExport");
exports.describeJournalExport = DescribeJournalExport_1.describeJournalExport;
var DescribeLedger_1 = require("./DescribeLedger");
exports.describeLedger = DescribeLedger_1.describeLedger;
var ExportJournal_1 = require("./ExportJournal");
exports.createExportAndWaitForCompletion = ExportJournal_1.createExportAndWaitForCompletion;
exports.createS3BucketIfNotExists = ExportJournal_1.createS3BucketIfNotExists;
exports.setUpS3EncryptionConfiguration = ExportJournal_1.setUpS3EncryptionConfiguration;
var GetBlock_1 = require("./GetBlock");
exports.verifyBlock = GetBlock_1.verifyBlock;
var GetDigest_1 = require("./GetDigest");
exports.getDigestResult = GetDigest_1.getDigestResult;
var GetRevision_1 = require("./GetRevision");
exports.lookupRegistrationForVin = GetRevision_1.lookupRegistrationForVin;
exports.verifyRegistration = GetRevision_1.verifyRegistration;
var InsertDocument_1 = require("./InsertDocument");
exports.insertDocument = InsertDocument_1.insertDocument;
exports.updatePersonId = InsertDocument_1.updatePersonId;
var ListLedgers_1 = require("./ListLedgers");
exports.listLedgers = ListLedgers_1.listLedgers;
var JournalS3ExportReader_1 = require("./qldb/JournalS3ExportReader");
exports.readExport = JournalS3ExportReader_1.readExport;
var Util_1 = require("./qldb/Util");
exports.getDocumentId = Util_1.getDocumentId;
exports.getFieldValue = Util_1.getFieldValue;
exports.recursivePathLookup = Util_1.recursivePathLookup;
exports.sleep = Util_1.sleep;
exports.writeValueAsIon = Util_1.writeValueAsIon;
var Verifier_1 = require("./qldb/Verifier");
exports.flipRandomBit = Verifier_1.flipRandomBit;
exports.joinHashesPairwise = Verifier_1.joinHashesPairwise;
exports.parseBlock = Verifier_1.parseBlock;
exports.verifyDocument = Verifier_1.verifyDocument;
var RegisterDriversLicense_1 = require("./RegisterDriversLicense");
exports.lookUpDriversLicenseForPerson = RegisterDriversLicense_1.lookUpDriversLicenseForPerson;
var RenewDriversLicense_1 = require("./RenewDriversLicense");
exports.renewDriversLicense = RenewDriversLicense_1.renewDriversLicense;
var SampleData_1 = require("./model/SampleData");
exports.DRIVERS_LICENSE = SampleData_1.DRIVERS_LICENSE;
exports.PERSON = SampleData_1.PERSON;
exports.VEHICLE = SampleData_1.VEHICLE;
exports.VEHICLE_REGISTRATION = SampleData_1.VEHICLE_REGISTRATION;
var ScanTable_1 = require("./ScanTable");
exports.prettyPrintResultList = ScanTable_1.prettyPrintResultList;
exports.scanTableForDocuments = ScanTable_1.scanTableForDocuments;
exports.scanTables = ScanTable_1.scanTables;
var TagResources_1 = require("./TagResources");
exports.listTags = TagResources_1.listTags;
exports.tagResource = TagResources_1.tagResource;
exports.untagResource = TagResources_1.untagResource;
var TransferVehicleOwnership_1 = require("./TransferVehicleOwnership");
exports.findPersonFromDocumentId = TransferVehicleOwnership_1.findPersonFromDocumentId;
exports.findPrimaryOwnerForVehicle = TransferVehicleOwnership_1.findPrimaryOwnerForVehicle;
exports.validateAndUpdateRegistration = TransferVehicleOwnership_1.validateAndUpdateRegistration;
