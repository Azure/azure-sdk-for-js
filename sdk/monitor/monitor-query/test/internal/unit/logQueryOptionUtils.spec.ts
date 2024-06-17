// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { getLogQueryEndpoint } from "../../../src/internal/logQueryOptionUtils";

describe("logQueryOptionsUtils", () => {
  describe("getLogQueryEndpoint", () => {
    it("should return the endpoint with the version", () => {
      const expected = "http://microsoft.com/v1";

      const endpoint1 = "http://microsoft.com/";
      const endpoint2 = "http://microsoft.com";

      const result1 = getLogQueryEndpoint({ endpoint: endpoint1 });
      const result2 = getLogQueryEndpoint({ endpoint: endpoint2 });

      assert.equal(result1, expected);
      assert.equal(result2, expected);
    });
  });
});
