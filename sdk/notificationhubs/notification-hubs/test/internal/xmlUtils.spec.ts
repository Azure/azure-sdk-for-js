// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { isDefined } from "../../src/utils/xmlUtils";

describe("xmlUtils", () => {
  describe("isDefined", () => {
    it("should return false for an undefined value", () => {
      let value: string | undefined;
      const actual = isDefined(value);
      assert.isFalse(actual);
    });

    it("should return true for a value that isn't undefined", () => {
      let value = "42";
      const actual = isDefined(value);
      assert.isTrue(actual);
    })
  });
});
