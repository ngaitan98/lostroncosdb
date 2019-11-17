import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Create multiple tables in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to create.
 * @returns Promise which fulfills with the number of changes to the database.
 */
export declare function createTable(txn: TransactionExecutor, tableName: string): Promise<number>;
