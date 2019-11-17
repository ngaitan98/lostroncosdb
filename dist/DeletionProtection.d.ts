import { QLDB } from "aws-sdk";
/**
 * Update an existing ledger's deletion protection.
 * @param ledgerName Name of the ledger to update.
 * @param qldbClient The QLDB control plane client to use.
 * @param deletionProtection Enables or disables the deletion protection.
 * @returns Promise which fulfills with void.
 */
export declare function setDeletionProtection(ledgerName: string, qldbClient: QLDB, deletionProtection: boolean): Promise<void>;
