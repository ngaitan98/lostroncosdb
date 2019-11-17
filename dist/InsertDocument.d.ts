import { Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { Reader } from "ion-js";
/**
 * Insert the given list of documents into a table in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to insert documents into.
 * @param documents List of documents to insert.
 * @returns Promise which fulfills with a {@linkcode Result} object.
 */
export declare function insertDocument(txn: TransactionExecutor, tableName: string, documents: object[]): Promise<Result>;
/**
 * Update the PersonId value for DriversLicense records and the PrimaryOwner value for VehicleRegistration records.
 * @param documentIds List of document IDs.
 */
export declare function updatePersonId(documentIds: Reader[]): void;
