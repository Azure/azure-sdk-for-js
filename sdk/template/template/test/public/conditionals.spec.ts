// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */

import { isNode } from "@azure/core-http";
import { assert } from "chai";
import { isLiveMode } from "@azure/test-utils-recorder";

describe("Tests with conditionals", function() {
  it("should test A #node", function(): void {
    if (!isNode) {
      return this.skip();
    }
    assert.ok(isNode);
  });

  it("should test B #browser", function(): void {
    if (isNode) {
      return this.skip();
    }
    assert.ok(!isNode);
  });

  it("should test C #live", function(): void {
    if (!isLiveMode()) {
      return this.skip();
    }
    assert.ok(isLiveMode());
  });
});
