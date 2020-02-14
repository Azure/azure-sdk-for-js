// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isValidUuid } from "../lib/util/utils";

describe("utils", function() {
  describe("isValidUuid()", function() {
    it("should return true on a valid Uuid in multiple calls", function() {

      const uuidString = "ae9b0564-7aa1-47d1-8061-0ffd8f12f723";

      isValidUuid(uuidString).should.be.true;

      isValidUuid(uuidString).should.be.true;
    })
  });
})