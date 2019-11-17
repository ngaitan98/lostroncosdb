import { QLDB } from "aws-sdk";
import { GetDigestResponse } from "aws-sdk/clients/qldb";
/**
 * Get the digest of a ledger's journal.
 * @param ledgerName Name of the ledger to operate on.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a GetDigestResponse.
 */
export declare function getDigestResult(ledgerName: string, qldbClient: QLDB): Promise<GetDigestResponse>;
