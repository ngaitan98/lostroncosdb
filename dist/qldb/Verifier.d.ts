import { Digest, ValueHolder } from "aws-sdk/clients/qldb";
/**
 * Flip a single random bit in the given hash value.
 * This method is intended to be used for purpose of demonstrating the QLDB verification features only.
 * @param original The hash value to alter.
 * @returns The altered hash with a single random bit changed.
 */
export declare function flipRandomBit(original: any): Uint8Array;
/**
 * Take two hash values, sort them, concatenate them, and generate a new hash value from the concatenated values.
 * @param h1 Byte array containing one of the hashes to compare.
 * @param h2 Byte array containing one of the hashes to compare.
 * @returns The concatenated array of hashes.
 */
export declare function joinHashesPairwise(h1: Uint8Array, h2: Uint8Array): Uint8Array;
/**
 * Parse the Block object returned by QLDB and retrieve block hash.
 * @param valueHolder A structure containing an Ion string value.
 * @returns The block hash.
 */
export declare function parseBlock(valueHolder: ValueHolder): Uint8Array;
/**
 *  Verify document revision against the provided digest.
 * @param documentHash The SHA-256 value representing the document revision to be verified.
 * @param digest The SHA-256 hash value representing the ledger digest.
 * @param proof The Proof object retrieved from GetRevision.getRevision.
 * @returns If the document revision verifies against the ledger digest.
 */
export declare function verifyDocument(documentHash: Uint8Array, digest: Digest, proof: ValueHolder): boolean;
