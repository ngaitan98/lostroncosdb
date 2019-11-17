import { Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Query drivers license table by person ID.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param personId The person ID to check.
 * @returns Promise which fulfills with a {@linkcode Result} object.
 */
export declare function lookUpDriversLicenseForPerson(txn: TransactionExecutor, personId: string): Promise<Result>;
