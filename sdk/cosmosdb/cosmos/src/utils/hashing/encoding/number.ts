// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BytePrefix } from "./prefix.js";

export function writeNumberForBinaryEncodingJSBI(hash: number): Buffer {
  let payload = encodeNumberAsUInt64JSBI(hash);
  let outputStream = Buffer.from(BytePrefix.Number, "hex");
  const firstChunk = BigInt.asUintN(64, payload >> BigInt(56));

  outputStream = Buffer.concat([outputStream, Buffer.from(firstChunk.toString(16), "hex")]);
  payload = BigInt.asUintN(64, BigInt(payload << BigInt(0x8)));

  let byteToWrite = BigInt(0);
  let firstIteration = false;
  let shifted: bigint;
  let padded: string;

  do {
    if (!firstIteration) {
      // we pad because after shifting because we will produce characters like "f" or similar,
      // which cannot be encoded as hex in a buffer because they are invalid hex
      // https://github.com/nodejs/node/issues/24491
      padded = byteToWrite.toString(16).padStart(2, "0");
      if (padded !== "00") {
        outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
      }
    } else {
      firstIteration = false;
    }

    shifted = BigInt.asUintN(64, payload >> BigInt(56));
    byteToWrite = BigInt.asUintN(64, shifted | BigInt(0x01));
    payload = BigInt.asUintN(64, payload << BigInt(7));
  } while (payload !== BigInt(0));

  const lastChunk = BigInt.asUintN(64, byteToWrite & BigInt(0xfe));
  // we pad because after shifting because we will produce characters like "f" or similar,
  // which cannot be encoded as hex in a buffer because they are invalid hex
  // https://github.com/nodejs/node/issues/24491
  padded = lastChunk.toString(16).padStart(2, "0");
  if (padded !== "00") {
    outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
  }

  return outputStream;
}

function encodeNumberAsUInt64JSBI(value: number): bigint {
  const rawValueBits = getRawBitsJSBI(value);
  const mask = BigInt(0x8000000000000000);
  const returned = mask > rawValueBits ? rawValueBits ^ mask : ~rawValueBits + BigInt(1);
  return returned;
}

export function doubleToByteArrayJSBI(double: number): Buffer {
  const output: Buffer = Buffer.alloc(8);
  const lng = getRawBitsJSBI(double);
  for (let i = 0; i < 8; i++) {
    output[i] = Number((lng >> (BigInt(i) * BigInt(8))) & BigInt(0xff));
  }
  return output;
}

function getRawBitsJSBI(value: number): bigint {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  return BigInt(`0x${buf2hex(view.buffer)}`);
}

function buf2hex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x: number) => ("00" + x.toString(16)).slice(-2))
    .join("");
}
