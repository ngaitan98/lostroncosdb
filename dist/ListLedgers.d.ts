import { QLDB } from "aws-sdk";
import { LedgerSummary } from "aws-sdk/clients/qldb";
/**
 * List all ledgers.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a LedgerSummary array.
 */
export declare function listLedgers(qldbClient: QLDB): Promise<LedgerSummary[]>;
