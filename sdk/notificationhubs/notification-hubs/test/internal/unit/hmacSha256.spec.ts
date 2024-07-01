// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { signString } from "../../../src/auth/hmacSha256.js";

describe("signString", () => {
  it("should calculate correct HMAC SHA256 signature", async () => {
    const key = "mysecretkey";
    const data = "mydata";
    const expectedSignature = "u0JTQtSbhCo8r7%2BYr%2FRNiJOs7%2FVwDireHAXovvLBbXo%3D";
    const signature = await signString(key, data);

    assert.equal(signature, expectedSignature);
  });

  it("should produce different signatures for different keys", async () => {
    const key1 = "key1";
    const key2 = "key2";
    const data = "same data";
    const signature1 = await signString(key1, data);
    const signature2 = await signString(key2, data);

    assert.notEqual(signature1, signature2);
  });

  it("should produce different signatures for different data", async () => {
    const key = "samekey";
    const data1 = "data1";
    const data2 = "data2";
    const signature1 = await signString(key, data1);
    const signature2 = await signString(key, data2);

    assert.notEqual(signature1, signature2);
  });
});
