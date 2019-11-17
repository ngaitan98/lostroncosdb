import { QLDB } from "aws-sdk";
import { ValueHolder } from "aws-sdk/clients/qldb";
/**
 * Verify block by validating the proof returned in the getBlock response.
 * @param ledgerName The ledger to get the digest from.
 * @param blockAddress The address of the block to verify.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with void.
 * @throws Error: When verification fails.
 */
export declare function verifyBlock(ledgerName: string, blockAddress: ValueHolder, qldbClient: QLDB): Promise<void>;
