// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNode } from "../../../src/index.js";
import { describe, it, assert } from "vitest";

describe("checkEnvironment (browser)", function () {
  describe("isNode(browser)", function () {
    it("should return true", async function () {
      assert.isFalse(isNode);
    });
  });
});
