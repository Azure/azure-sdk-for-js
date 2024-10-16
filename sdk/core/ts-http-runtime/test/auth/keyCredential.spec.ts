// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { isKeyCredential } from "../../src/auth/keyCredential.js";

describe("isKeyCredential", function () {
  it("should return true for an object that resembles a KeyCredential", () => {
    assert.ok(isKeyCredential({ key: "bar" }));
  });

  it("should return false for an object that does not resemble a KeyCredential", () => {
    assert.strictEqual(isKeyCredential({}), false);
  });
});
