import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Delete a driver's license given a license number.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param licenseNumber The license number of the driver's license to de-register.
 * @returns Promise which fulfills with void.
 */
export declare function deregisterDriversLicense(txn: TransactionExecutor, licenseNumber: string): Promise<void>;
