// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { isSasTokenProvider } from "../../src/util/typeGuards.js";
import { createSasTokenProvider } from "../../src/auth/tokenProvider.js";

describe("typeGuards", () => {
  describe("isSasTokenProvider", () => {
    it("returns true for SasTokenProvider-like objects", () => {
      assert.isTrue(isSasTokenProvider({ isSasTokenProvider: true }));
    });

    it("returns true for real SasTokenProviderImpl instances", () => {
      const provider = createSasTokenProvider({
        sharedAccessKeyName: "keyName",
        sharedAccessKey: "key",
      });
      assert.isTrue(isSasTokenProvider(provider));
      assert.isTrue(provider.isSasTokenProvider);
    });

    it("returns false for non-SasTokenProvider objects", () => {
      assert.isFalse(isSasTokenProvider({ isSasTokenProvider: false }));
      assert.isFalse(isSasTokenProvider({}));
      assert.isFalse(isSasTokenProvider(null));
      assert.isFalse(isSasTokenProvider(undefined));
      assert.isFalse(isSasTokenProvider("string"));
    });
  });
});
