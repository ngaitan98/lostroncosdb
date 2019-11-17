import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Create an index for a particular table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to add indexes for.
 * @param indexAttribute Index to create on a single attribute.
 * @returns Promise which fulfills with the number of changes to the database.
 */
export declare function createIndex(txn: TransactionExecutor, tableName: string, indexAttribute: string): Promise<number>;
