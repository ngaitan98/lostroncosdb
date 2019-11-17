import { QldbSession, Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { Reader } from "ion-js";
/**
 * Pretty print the Readers in the provided result list.
 * @param resultList The result list containing the Readers to pretty print.
 */
export declare function prettyPrintResultList(resultList: Reader[]): void;
/**
 * Scan for all the documents in a table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName The name of the table to operate on.
 * @returns Promise which fulfills with a {@linkcode Result} object.
 */
export declare function scanTableForDocuments(txn: TransactionExecutor, tableName: string): Promise<Result>;
/**
 * Retrieve the list of table names.
 * @param session The session to retrieve table names from.
 * @returns Promise which fulfills with a list of table names.
 */
export declare function scanTables(session: QldbSession): Promise<string[]>;
