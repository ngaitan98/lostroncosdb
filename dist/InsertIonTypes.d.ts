import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Delete a table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to delete.
 * @returns Promise which fulfills with void.
 */
export declare function deleteTable(txn: TransactionExecutor, tableName: string): Promise<void>;
