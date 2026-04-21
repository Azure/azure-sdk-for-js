// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { signString } from "../../../src/util/hmacSha256.common.js";

describe("signString (browser - Web Crypto)", function () {
  it("produces a URL-encoded base64 HMAC-SHA256 signature", async function () {
    const signature = await signString("testKey", "testMessage");
    assert.isOk(signature);
    assert.isString(signature);
    // The result should be URL-encoded (no +, /, = unencoded)
    assert.notMatch(signature, /[+/=]/);
    assert.isOk(decodeURIComponent(signature));
  });

  it("returns consistent results for the same inputs", async function () {
    const sig1 = await signString("key", "data");
    const sig2 = await signString("key", "data");
    assert.equal(sig1, sig2);
  });

  it("returns different results for different keys", async function () {
    const sig1 = await signString("key1", "data");
    const sig2 = await signString("key2", "data");
    assert.notEqual(sig1, sig2);
  });
});

describe("hmacSha256.common (Web Crypto API)", () => {
  it("signString produces a valid HMAC-SHA256 signature", async () => {
    const result = await signString("testkey", "testdata");
    assert.isString(result);
    assert.isNotEmpty(result);
  });
});
