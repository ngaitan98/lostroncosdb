import { Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Renew the ValidToDate and ValidFromDate of a driver's license.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param validFromDate The new ValidFromDate.
 * @param validToDate The new ValidToDate.
 * @param licenseNumber License number of the driver's license to update.
 * @returns Promise which fulfills with {@linkcode Result} object.
 */
export declare function renewDriversLicense(txn: TransactionExecutor, validFromDate: Date, validToDate: Date, licenseNumber: string): Promise<Result>;
