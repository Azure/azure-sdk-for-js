// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { proxyPolicy } from "@azure/core-rest-pipeline";

describe("proxyPolicy (browser)", function () {
  it("Throws on creation", function () {
    assert.throws(() => {
      proxyPolicy();
    }, /proxyPolicy is not supported in browser environment/);
  });
});
