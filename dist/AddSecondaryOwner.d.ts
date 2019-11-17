import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
/**
 * Add a secondary owner into 'VehicleRegistration' table for a particular VIN.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param vin VIN of the vehicle to query.
 * @param secondaryOwnerId The secondary owner's person ID.
 * @returns Promise which fulfills with void.
 */
export declare function addSecondaryOwner(txn: TransactionExecutor, vin: string, secondaryOwnerId: string): Promise<void>;
/**
 * Query for a document ID with a government ID.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param governmentId The government ID to query with.
 * @returns Promise which fulfills with the document ID as a string.
 */
export declare function getDocumentIdByGovId(txn: TransactionExecutor, governmentId: string): Promise<string>;
/**
 * Check whether a driver has already been registered for the given VIN.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param vin VIN of the vehicle to query.
 * @param secondaryOwnerId The secondary owner's person ID.
 * @returns Promise which fulfills with a boolean.
 */
export declare function isSecondaryOwnerForVehicle(txn: TransactionExecutor, vin: string, secondaryOwnerId: string): Promise<boolean>;
