// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it } from "vitest";
import { proxyPolicy } from "../../src/policies/proxyPolicy.browser";

describe("proxyPolicy (browser)", function () {
  it("Throws on creation", function () {
    assert.throws(() => {
      proxyPolicy();
    }, /proxyPolicy is not supported in browser environment/);
  });
});
