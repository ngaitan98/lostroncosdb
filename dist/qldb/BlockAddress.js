"use strict";
/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BlockAddress = /** @class */ (function () {
    function BlockAddress(strandId, sequenceNo) {
        this._strandId = strandId;
        this._sequenceNo = sequenceNo;
    }
    return BlockAddress;
}());
exports.BlockAddress = BlockAddress;
/**
 * Convert a block address from Reader into a ValueHolder.
 * Shape of the ValueHolder must be: {'IonText': "{strandId: <"strandId">, sequenceNo: <sequenceNo>}"}
 * @param reader The Reader that contains the block address values to convert.
 * @returns The ValueHolder that contains the strandId and sequenceNo.
 */
function blockAddressToValueHolder(reader) {
    var strandId = getStrandId(reader);
    var sequenceNo = getSequenceNo(reader);
    var valueHolder = "{strandId: \"" + strandId + "\", sequenceNo: " + sequenceNo + "}";
    var blockAddress = { IonText: valueHolder };
    return blockAddress;
}
exports.blockAddressToValueHolder = blockAddressToValueHolder;
/**
 * Helper method that steps into the provided Reader to get the Metadata ID.
 * @param reader The Reader to step into.
 * @returns The Metadata ID.
 */
function getMetadataId(reader) {
    reader.stepOut();
    reader.next();
    return reader.stringValue();
}
exports.getMetadataId = getMetadataId;
/**
 * Helper method that steps into the provided Reader to get the Sequence No.
 * @param reader The Reader to step into.
 * @returns The Sequence No.
 */
function getSequenceNo(reader) {
    reader.next();
    var fieldName = reader.fieldName();
    if (fieldName !== "sequenceNo") {
        throw new Error("Expected field name sequenceNo, found " + fieldName + ".");
    }
    return reader.numberValue();
}
exports.getSequenceNo = getSequenceNo;
/**
 * Helper method that steps into the provided Reader to get the Strand ID.
 * @param reader The Reader to step into.
 * @returns The Strand ID.
 */
function getStrandId(reader) {
    reader.next();
    reader.stepIn();
    var type = reader.next();
    if (type.name !== "struct") {
        throw new Error("Unexpected format: expected struct, but got IonType: " + type.name);
    }
    reader.stepIn();
    reader.next();
    var fieldName = reader.fieldName();
    if (fieldName !== "strandId") {
        throw new Error("Expected field name strandId, found " + fieldName + ".");
    }
    return reader.stringValue();
}
exports.getStrandId = getStrandId;
