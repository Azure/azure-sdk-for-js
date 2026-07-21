// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { proxyPolicy } from "../../../src/policies/internal.js";

describe("proxyPolicy (react-native)", function () {
  it("returns a no-op policy", function () {
    const policy = proxyPolicy();
    assert.strictEqual(policy.name, "proxyPolicy");
  });
});
