// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  calculateRetryDelay,
  getRandomIntegerInclusive,
  isError,
  isObject,
  randomUUID,
  uint8ArrayToString,
  stringToUint8Array,
} from "../../src/index.js";

describe("index.ts re-exported functions", function () {
  it("calculateRetryDelay should return a retryAfterInMs", function () {
    const result = calculateRetryDelay(1, { retryDelayInMs: 100, maxRetryDelayInMs: 5000 });
    assert.isObject(result);
    assert.isNumber(result.retryAfterInMs);
    assert.isAtLeast(result.retryAfterInMs, 0);
  });

  it("getRandomIntegerInclusive should return a number in range", function () {
    const val = getRandomIntegerInclusive(5, 10);
    assert.isAtLeast(val, 5);
    assert.isAtMost(val, 10);
  });

  it("isError should detect Error objects", function () {
    assert.isTrue(isError(new Error("test")));
    assert.isFalse(isError("not an error"));
  });

  it("isObject should detect plain objects", function () {
    assert.isTrue(isObject({}));
    assert.isFalse(isObject(null));
    assert.isFalse(isObject("string"));
  });

  it("randomUUID should return a UUID string", function () {
    const uuid = randomUUID();
    assert.isString(uuid);
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("uint8ArrayToString should convert bytes to string", function () {
    const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
    assert.strictEqual(uint8ArrayToString(bytes, "utf-8"), "Hello");
  });

  it("stringToUint8Array should convert string to bytes", function () {
    const bytes = stringToUint8Array("Hello", "utf-8");
    assert.deepEqual(Array.from(bytes), [72, 101, 108, 108, 111]);
  });
});
