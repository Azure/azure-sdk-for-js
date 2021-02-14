// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

import { expect } from "chai";
import { isValidUuid } from "../src/util/utils";

describe("utils", function() {
  describe("isValidUuid()", function() {
    it("should return true on a valid Uuid in multiple calls", function() {
      const uuidString = "ae9b0564-7aa1-47d1-8061-0ffd8f12f723";

      expect(isValidUuid(uuidString), "First call failed").to.be.true;
      expect(isValidUuid(uuidString), "Second call failed").to.be.true;
    });
  });
});
