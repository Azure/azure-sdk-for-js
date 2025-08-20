// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNode } from "@azure/core-util";
import { describe, it, assert } from "vitest";

describe("checkEnvironment (node)", function () {
  describe("isNode (node)", function () {
    it("should return true", async function () {
      assert.isTrue(isNode);
    });
  });
});
