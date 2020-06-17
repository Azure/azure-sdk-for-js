// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonWebKey } from "../keysModels";

/**
 * @internal
 * @ignore
 * Encodes a length of a packet in DER format
 */
function encodeLength(length: number): Uint8Array {
  if (length <= 127) {
    return Uint8Array.of(length);
  } else if (length < 256) {
    return Uint8Array.of(0x81, length);
  } else if (length < 65536) {
    return Uint8Array.of(0x82, length >> 8, length & 0xff);
  } else {
    throw new Error("Unsupported length to encode");
  }
}

/**
 * @internal
 * @ignore
 * Encodes a buffer for DER, as sets the id to the given id
 */
function encodeBuffer(buffer: Uint8Array, bufferId: number): Uint8Array {
  if (buffer.length === 0) {
    return buffer;
  }

  let result = new Uint8Array(buffer);

  // If the high bit is set, prepend a 0
  if ((result[0] & 0x80) === 0x80) {
    const array = new Uint8Array(result.length + 1);
    array[0] = 0;
    array.set(result, 1);
    result = array;
  }

  // Prepend the DER header for this buffer
  const encodedLength = encodeLength(result.length);

  const totalLength = 1 + encodedLength.length + result.length;

  const outputBuffer = new Uint8Array(totalLength);
  outputBuffer[0] = bufferId;
  outputBuffer.set(encodedLength, 1);
  outputBuffer.set(result, 1 + encodedLength.length);

  return outputBuffer;
}

/**
 * @internal
 * @ignore
 * Encode a JWK to PEM format. To do so, it internally repackages the JWK as a DER
 * that is then encoded as a PEM.
 */
export function convertJWKtoPEM(key: JsonWebKey): string {
  if (!key.n || !key.e) {
    throw new Error("Unsupported key format for local operations");
  }
  const encoded_n = encodeBuffer(key.n, 0x2); // INTEGER
  const encoded_e = encodeBuffer(key.e, 0x2); // INTEGER

  const encoded_ne = new Uint8Array(encoded_n.length + encoded_e.length);
  encoded_ne.set(encoded_n, 0);
  encoded_ne.set(encoded_e, encoded_n.length);

  const full_encoded = encodeBuffer(encoded_ne, 0x30); // SEQUENCE

  const buffer = Buffer.from(full_encoded).toString("base64");

  const beginBanner = "-----BEGIN RSA PUBLIC KEY-----\n";
  const endBanner = "-----END RSA PUBLIC KEY-----";

  /*
   Fill in the PEM with 64 character lines as per RFC:

   "To represent the encapsulated text of a PEM message, the encoding
   function's output is delimited into text lines (using local
   conventions), with each line except the last containing exactly 64
   printable characters and the final line containing 64 or fewer
   printable characters."
  */
  let outputString = beginBanner;
  const lines = buffer.match(/.{1,64}/g);

  if (lines) {
    for (const line of lines) {
      outputString += line;
      outputString += "\n";
    }
  } else {
    throw new Error("Could not create correct PEM");
  }
  outputString += endBanner;

  return outputString;
}
