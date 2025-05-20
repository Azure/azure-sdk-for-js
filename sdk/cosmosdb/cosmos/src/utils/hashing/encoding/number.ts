// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BytePrefix } from "./prefix.js";

export function writeNumberForBinaryEncodingBigInt(hash: number): Buffer {
  let payload = encodeNumberAsUInt64BigInt(hash);
  let outputStream = Buffer.from(BytePrefix.Number, "hex");
  const firstChunk = (payload >> BigInt(56)) & BigInt(0xff);

  outputStream = Buffer.concat([
    outputStream,
    Buffer.from(firstChunk.toString(16).padStart(2, "0"), "hex"),
  ]);
  payload = (payload << BigInt(8)) & BigInt("0xffffffffffffffff");

  let byteToWrite = BigInt(0);
  let firstIteration = true;

  do {
    if (!firstIteration) {
      const padded = byteToWrite.toString(16).padStart(2, "0");
      if (padded !== "00") {
        outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
      }
    } else {
      firstIteration = false;
    }

    const shifted = (payload >> BigInt(56)) & BigInt(0xff);
    byteToWrite = shifted | BigInt(0x01);
    payload = (payload << BigInt(7)) & BigInt("0xffffffffffffffff");
  } while (payload !== BigInt(0));

  const lastChunk = byteToWrite & BigInt(0xfe);
  const padded = lastChunk.toString(16).padStart(2, "0");
  if (padded !== "00") {
    outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
  }

  return outputStream;
}

function encodeNumberAsUInt64BigInt(value: number): bigint {
  const rawValueBits = getRawBitsBigInt(value);
  const mask = BigInt(0x8000000000000000);
  return mask > rawValueBits ? rawValueBits ^ mask : ~rawValueBits + BigInt(1);
}

function getRawBitsBigInt(value: number): bigint {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  return BigInt(`0x${buf2hex(view.buffer)}`);
}

function buf2hex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x: number) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

export function doubleToByteArrayBigInt(double: number): Buffer {
  const output: Buffer = Buffer.alloc(8);
  const lng = getRawBitsBigInt(double);
  for (let i = 0; i < 8; i++) {
    output[i] = Number((lng >> BigInt(i * 8)) & BigInt(0xff));
  }
  return output;
}
