// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { concatUint8Arrays } from "../../../../src/utils/uint8.js";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

describe("Uint8 utils", () => {
  it("stringToUint8Array with hex should produce correct output", () => {
    const hex = "deadbeef";
    const actualArray = stringToUint8Array(hex, "hex");
    const expectedArray = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    assert.deepEqual(actualArray, expectedArray);
  });

  it("uint8ArrayToString with hex should produce correct hex string", () => {
    const arr = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const actualHex = uint8ArrayToString(arr, "hex");
    assert.equal(actualHex, "deadbeef");
  });

  it("concatUint8Arrays should produce correct concatenated output", () => {
    const part1 = stringToUint8Array("dead", "hex");
    const part2 = stringToUint8Array("beef", "hex");
    const concatenationFromUInt8Array = concatUint8Arrays([part1, part2]);
    const expected = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    assert.deepEqual(concatenationFromUInt8Array, expected);
  });

  it("concatUint8Arrays handles empty array correctly", () => {
    const actual = concatUint8Arrays([]);
    const expected = new Uint8Array(0);
    assert.deepEqual(actual, expected);
  });
});
