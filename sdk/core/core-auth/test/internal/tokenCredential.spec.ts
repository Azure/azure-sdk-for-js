// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { isBearerToken, isPopToken } from "../../src/tokenCredential.js";

describe("isBearerToken", () => {
  it("should return true when tokenType is undefined", () => {
    assert.isTrue(isBearerToken({ token: "test", expiresOnTimestamp: 0 }));
  });

  it("should return true when tokenType is 'Bearer'", () => {
    assert.isTrue(isBearerToken({ token: "test", expiresOnTimestamp: 0, tokenType: "Bearer" }));
  });

  it("should return false when tokenType is 'pop'", () => {
    assert.isFalse(isBearerToken({ token: "test", expiresOnTimestamp: 0, tokenType: "pop" }));
  });
});

describe("isPopToken", () => {
  it("should return true when tokenType is 'pop'", () => {
    assert.isTrue(isPopToken({ token: "test", expiresOnTimestamp: 0, tokenType: "pop" }));
  });

  it("should return false when tokenType is 'Bearer'", () => {
    assert.isFalse(isPopToken({ token: "test", expiresOnTimestamp: 0, tokenType: "Bearer" }));
  });

  it("should return false when tokenType is undefined", () => {
    assert.isFalse(isPopToken({ token: "test", expiresOnTimestamp: 0 }));
  });
});
