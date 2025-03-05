// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential, generateTableSas } from "../../../src/index.js";
import { describe, it, assert } from "vitest";

// This file is empty as sas generation is not supported in browsers
describe("generateSas Browser", function () {
  it("should throw", () => {
    try {
      generateTableSas("testTable", new AzureNamedKeyCredential("keyName", "keySecret"));
      assert.fail("`Expected generateTableSas to throw when running in the browser");
    } catch (error: any) {
      assert.equal((error as Error)?.message, "computeHMACSHA256 is not supported in the browser");
    }
  });
});
