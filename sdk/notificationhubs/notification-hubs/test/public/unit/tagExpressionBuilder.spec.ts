// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { createTagExpression } from "../../../src/models/tagExpressionBuilder.js";

describe("tagExpressionBuilder", () => {
  describe("createTagExpression", () => {
    it("should parse an array into or statements", () => {
      const tags = ["abc", "def"];

      const result = createTagExpression(tags);

      assert.equal(result, "abc||def");
    });
  });
});
