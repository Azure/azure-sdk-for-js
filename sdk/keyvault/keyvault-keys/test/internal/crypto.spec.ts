// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { checkKeyValidity } from "../../src/cryptographyClient";

describe("CryptographyClient, internal tests", () => {
  it("Checking that the key's notBefore is respected", async function() {
    const keyBundle = {
      attributes: {
        notBefore: new Date(Date.now() + 60 * 1000 * 60 * 24) // Now + 24h
      }
    };
    let error: Error | undefined = undefined;
    try {
      await checkKeyValidity("1", keyBundle);
    } catch (e) {
      error = e;
    }
    assert.equal(
      error?.message,
      `Key 1 can't be used before ${keyBundle.attributes.notBefore.toISOString()}`
    );
  });

  it("Checking that the key's expires is respected", async function() {
    const keyBundle = {
      attributes: {
        expires: new Date(Date.now() - 60 * 1000 * 60 * 24) // Now - 24h
      }
    };
    let error: Error | undefined = undefined;
    try {
      await checkKeyValidity("1", keyBundle);
    } catch (e) {
      error = e;
    }
    assert.equal(error?.message, `Key 1 expired at ${keyBundle.attributes.expires.toISOString()}`);
  });
});
