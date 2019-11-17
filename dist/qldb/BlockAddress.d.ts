import { ValueHolder } from "aws-sdk/clients/qldb";
import { Reader } from "ion-js";
export declare class BlockAddress {
    _strandId: string;
    _sequenceNo: number;
    constructor(strandId: string, sequenceNo: number);
}
/**
 * Convert a block address from Reader into a ValueHolder.
 * Shape of the ValueHolder must be: {'IonText': "{strandId: <"strandId">, sequenceNo: <sequenceNo>}"}
 * @param reader The Reader that contains the block address values to convert.
 * @returns The ValueHolder that contains the strandId and sequenceNo.
 */
export declare function blockAddressToValueHolder(reader: Reader): ValueHolder;
/**
 * Helper method that steps into the provided Reader to get the Metadata ID.
 * @param reader The Reader to step into.
 * @returns The Metadata ID.
 */
export declare function getMetadataId(reader: Reader): string;
/**
 * Helper method that steps into the provided Reader to get the Sequence No.
 * @param reader The Reader to step into.
 * @returns The Sequence No.
 */
export declare function getSequenceNo(reader: Reader): number;
/**
 * Helper method that steps into the provided Reader to get the Strand ID.
 * @param reader The Reader to step into.
 * @returns The Strand ID.
 */
export declare function getStrandId(reader: Reader): string;
