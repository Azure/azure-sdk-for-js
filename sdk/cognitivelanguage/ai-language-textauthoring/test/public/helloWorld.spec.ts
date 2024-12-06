// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createAuthoringClient from "../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { describe, it, assert } from "vitest";

describe(`Authoring Test`, () => {
  it("Random endpoint", async () => {
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
