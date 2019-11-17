import { QLDB } from "aws-sdk";
import { DescribeLedgerResponse } from "aws-sdk/clients/qldb";
/**
 * Describe a ledger.
 * @param ledgerName Name of the ledger to describe.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a DescribeLedgerResponse.
 */
export declare function describeLedger(ledgerName: string, qldbClient: QLDB): Promise<DescribeLedgerResponse>;
