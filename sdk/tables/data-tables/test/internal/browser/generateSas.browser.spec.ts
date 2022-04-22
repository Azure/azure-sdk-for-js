// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureNamedKeyCredential, generateTableSas } from "../../../src";

import { assert } from "chai";

// This file is empty as sas generation is not supported in browsers
describe("generateSas Browser", () => {
  it("should throw", function () {
    try {
      generateTableSas("testTable", new AzureNamedKeyCredential("keyName", "keySecret"));
      assert.fail("`Expected generateTableSas to throw when running in the browser");
    } catch (error: any) {
      assert.equal((error as Error)?.message, "computeHMACSHA256 is not supported in the browser");
    }
  });
});
