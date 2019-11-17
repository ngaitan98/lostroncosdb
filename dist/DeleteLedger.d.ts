import { QLDB } from "aws-sdk";
/**
 * Send a request to QLDB to delete the specified ledger.
 * @param ledgerName Name of the ledger to be deleted.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with void.
 */
export declare function deleteLedger(ledgerName: string, qldbClient: QLDB): Promise<void>;
/**
 * Wait for the ledger to be deleted.
 * @param ledgerName Name of the ledger to be deleted.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with void.
 */
export declare function waitForDeleted(ledgerName: string, qldbClient: QLDB): Promise<void>;
