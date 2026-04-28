// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { signString } from "../../../src/util/hmacSha256.common.js";

describe("signString (browser - Web Crypto)", function () {
  it("produces a URL-encoded base64 HMAC-SHA256 signature", async function () {
    const signature = await signString("testKey", "testMessage");
    assert.strictEqual(signature, "8N7PlLvnGgnE2gFU7%2BAkSxmAc02cXFkOLlFD5gTuOjo%3D");
    assert.strictEqual(
      decodeURIComponent(signature),
      "8N7PlLvnGgnE2gFU7+AkSxmAc02cXFkOLlFD5gTuOjo=",
    );
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
