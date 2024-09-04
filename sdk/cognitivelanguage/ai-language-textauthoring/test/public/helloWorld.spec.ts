// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Suite } from "mocha";
import { assert } from "@azure-tools/test-utils";
import createAuthoringClient from "../../src";
import { AzureKeyCredential } from "@azure/core-auth";
describe(`Authoring Test`, function (this: Suite) {
  it("Random endpoint", async function () {
    try {
      const client = createAuthoringClient(
        "Random Endpoint",
        new AzureKeyCredential("Random API Key"),
      );
      client.path("/authoring/analyze-text/projects").get();
      throw new Error("Test failure");
    } catch (err: any) {
      assert.notEqual((err as { message: string }).message, "Test failure");
    }
  });
});
