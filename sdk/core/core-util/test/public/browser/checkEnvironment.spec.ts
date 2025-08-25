// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNode } from "@azure/core-util";
import { describe, it, assert } from "vitest";

describe("checkEnvironment (browser)", function () {
  describe("isNode(browser)", function () {
    it("should return true", async function () {
      assert.isFalse(isNode);
    });
  });
});
