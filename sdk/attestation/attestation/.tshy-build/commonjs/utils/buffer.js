"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint8ArrayFromInput = Uint8ArrayFromInput;
/**
 * Converts an attestation input from Uint8Array/Buffer/Blob to Uint8Array.
 *
 * @param input - Input to attestation API.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
async function Uint8ArrayFromInput(input) {
    if (input === undefined) {
        return input;
    }
    if (input.byteLength === undefined) {
        throw TypeError("Blob is unsupported in node.");
    }
    // We've eliminated the 'Blob' case above, so we know this must be either a Buffer or Uint8Array.
    return input;
}
//# sourceMappingURL=buffer.js.map