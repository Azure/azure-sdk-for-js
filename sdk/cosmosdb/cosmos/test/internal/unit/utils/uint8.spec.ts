// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { concatUint8Arrays } from "../../../../src/utils/uint8.js";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";
import { Buffer } from "buffer";

describe("Uint8 utils", () => {
  it("stringToUint8Array with hex should produce same output as Buffer.from(hex, 'hex')", () => {
    const hex = "deadbeef";
    const actualArray = stringToUint8Array(hex, "hex");
    const expectedArray = Uint8Array.from(Buffer.from(hex, "hex"));
    assert.deepEqual(actualArray, expectedArray);
  });

  it("uint8ArrayToString with hex should produce same hex string as Buffer", () => {
    const arr = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const actualHex = uint8ArrayToString(arr, "hex");
    const expectedHex = Buffer.from(arr).toString("hex");
    assert.equal(actualHex, expectedHex);
  });

  it("concatUint8Arrays should produce same output as Buffer.concat", () => {
    const part1 = stringToUint8Array("dead", "hex");
    const part2 = stringToUint8Array("beef", "hex");
    const concatenationFromUInt8Array = concatUint8Arrays([part1, part2]);
    const concatenationFromBuffer = Buffer.concat([
      Buffer.from("dead", "hex"),
      Buffer.from("beef", "hex"),
    ]);
    assert.deepEqual(concatenationFromUInt8Array, concatenationFromBuffer);
  });

  it("concatUint8Arrays handles empty array correctly", () => {
    const actual = concatUint8Arrays([]);
    const expected = new Uint8Array(0);
    assert.deepEqual(actual, expected);
  });
});
