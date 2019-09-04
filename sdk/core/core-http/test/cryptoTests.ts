// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { generateKey } from "../lib/util/crypto";
import { assert } from "chai";

describe("generateKey(secret, stringToSign)", function() {
  it("generates valid key for secret as 'abc' and string to sign as 'def' ", async function() {
    const key: string = await generateKey("abc", "def");
    assert.equal(key, "IOvA8JNERwE081BA9j6pix2OQUISlJ7lxQBCnRXqsIE%3D%3D");
  });

  it("generates valid key when secret and stringToSign are empty", async function() {
    const key: string = await generateKey("", "");
    assert.equal(key, "thNnmggU2ex3L5XXeMNfxf8Wl8STcVZTxscSFEKSxa0%3D");
  });
});
