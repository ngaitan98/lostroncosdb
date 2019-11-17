import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { QLDB } from "aws-sdk";
import { Reader } from "ion-js";
/**
 * Query the table metadata for a particular vehicle for verification.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param vin VIN to query the table metadata of a specific registration with.
 * @returns Promise which fulfills with a list of Readers that contains the results of the query.
 */
export declare function lookupRegistrationForVin(txn: TransactionExecutor, vin: string): Promise<Reader[]>;
/**
 * Verify each version of the registration for the given VIN.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param ledgerName The ledger to get the digest from.
 * @param vin VIN to query the revision history of a specific registration with.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with void.
 * @throws Error: When verification fails.
 */
export declare function verifyRegistration(txn: TransactionExecutor, ledgerName: string, vin: string, qldbClient: QLDB): Promise<void>;
