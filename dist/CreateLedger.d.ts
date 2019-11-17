import { QLDB } from "aws-sdk";
import { CreateLedgerResponse, DescribeLedgerResponse } from "aws-sdk/clients/qldb";
/**
 * Create a new ledger with the specified name.
 * @param ledgerName Name of the ledger to be created.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a CreateLedgerResponse.
 */
export declare function createLedger(ledgerName: string, qldbClient: QLDB): Promise<CreateLedgerResponse>;
/**
 * Wait for the newly created ledger to become active.
 * @param ledgerName Name of the ledger to be checked on.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a DescribeLedgerResponse.
 */
export declare function waitForActive(ledgerName: string, qldbClient: QLDB): Promise<DescribeLedgerResponse>;
