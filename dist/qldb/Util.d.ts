import { TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { GetBlockResponse, GetDigestResponse, ValueHolder } from "aws-sdk/clients/qldb";
import { Reader, Writer } from "ion-js";
/**
 * Returns the string representation of a given BlockResponse.
 * @param blockResponse The BlockResponse to convert to string.
 * @returns The string representation of the supplied BlockResponse.
 */
export declare function blockResponseToString(blockResponse: GetBlockResponse): string;
/**
 * Returns the string representation of a given GetDigestResponse.
 * @param digestResponse The GetDigestResponse to convert to string.
 * @returns The string representation of the supplied GetDigestResponse.
 */
export declare function digestResponseToString(digestResponse: GetDigestResponse): string;
/**
 * Get the document IDs from the given table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName The table name to query.
 * @param field A field to query.
 * @param value The key of the given field.
 * @returns Promise which fulfills with the document ID as a string.
 */
export declare function getDocumentId(txn: TransactionExecutor, tableName: string, field: string, value: string): Promise<string>;
/**
 * Function which, given a reader and a path, traverses through the reader using the path to find the value.
 * @param ionReader The reader to operate on.
 * @param path The path to find the value.
 * @returns The value obtained after traversing the path.
 */
export declare function getFieldValue(ionReader: any, path: string[]): any;
/**
 * Helper method that traverses through the reader using the path to find the value.
 * @param ionReader The reader to operate on.
 * @param path The path to find the value.
 * @returns The value, or undefined if the provided path does not exist.
 */
export declare function recursivePathLookup(ionReader: Reader, path: string[]): any | undefined;
/**
 * Sleep for the specified amount of time.
 * @param ms The amount of time to sleep in milliseconds.
 * @returns Promise which fulfills with void.
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Returns the string representation of a given ValueHolder.
 * @param valueHolder The ValueHolder to convert to string.
 * @returns The string representation of the supplied ValueHolder.
 */
export declare function valueHolderToString(valueHolder: ValueHolder): string;
/**
 * Converts a given value to Ion using the provided writer.
 * @param value The value to covert to Ion.
 * @param ionWriter The Writer to pass the value into.
 * @throws Error: If the given value cannot be converted to Ion.
 */
export declare function writeValueAsIon(value: any, ionWriter: Writer): void;
