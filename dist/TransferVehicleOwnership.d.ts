import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { Reader } from "ion-js";
/**
 * Query a driver's information using the given ID.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param documentId The unique ID of a document in the Person table.
 * @returns Promise which fulfills with a Reader containing the person.
 */
export declare function findPersonFromDocumentId(txn: TransactionExecutor, documentId: string): Promise<Reader>;
/**
 * Find the primary owner for the given VIN.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param vin The VIN to find primary owner for.
 * @returns Promise which fulfills with a Reader containing the primary owner.
 */
export declare function findPrimaryOwnerForVehicle(txn: TransactionExecutor, vin: string): Promise<Reader>;
/**
 * Validate the current owner of the given vehicle and transfer its ownership to a new owner in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param vin The VIN of the vehicle to transfer ownership of.
 * @param currentOwner The GovId of the current owner of the vehicle.
 * @param newOwner The GovId of the new owner of the vehicle.
 */
export declare function validateAndUpdateRegistration(txn: TransactionExecutor, vin: string, currentOwner: string, newOwner: string): Promise<void>;
