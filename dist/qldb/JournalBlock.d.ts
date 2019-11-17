import { Reader } from "ion-js";
import { BlockAddress } from "./BlockAddress";
/**
 * Represents a JournalBlock that was recorded after executing a transaction in the ledger.
 */
export declare class JournalBlock {
    _blockAddress: BlockAddress;
    _blockHash: Uint8Array;
    _entriesHash: Uint8Array;
    _previousBlockHash: Uint8Array;
    constructor(blockAddress: BlockAddress, blockHash: Uint8Array, entriesHash: Uint8Array, previousBlockHash: Uint8Array);
}
/**
 * Construct a new JournalBlock object from an IonStruct.
 * @param reader The Reader that contains the journal block attributes.
 *               For this to work, the reader is expected to have the structure
 *               {
 *                  blockAddress:{
 *                      strandId:"string",
 *                      sequenceNo:number
 *                  },
 *                  transactionId:"string",
 *                  blockTimestamp:Date,
 *                  blockHash:{
 *                      {
 *                          blob
 *                      }
 *                  },
 *                  entriesHash:{
 *                      {
 *                          blob
 *                      }
 *                 },
 *                  previousBlockHash:{
 *                      {
 *                          blob
 *                      }
 *                  }
 *                  .........
 *               }
 * @returns The constructed JournalBlock object.
 */
export declare function fromIon(reader: Reader): JournalBlock;
