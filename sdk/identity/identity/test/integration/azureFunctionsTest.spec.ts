// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { requireEnvVar } from "../envTestUtils.js";
import { isLiveMode } from "../../../../test-utils/recorder/src/utils/utils.js";

describe("AzureFunctions Integration test", function () {
  it.skipIf(!isLiveMode())(
    "test the Azure Functions endpoint where the sync MI credential is used.",
    async function () {
      const baseUri = baseUrl();
      const response = await fetch(baseUri);
      const body = await response.text();
      console.log(body);
      assert.equal(response.status, 200, `Expected status 200. Received ${response.status}`);
      assert.equal(
        body,
        "Successfully authenticated with storage",
        `Expected message: "Successfully authenticated with storage". Received message: ${body}`,
      );
    },
  );
});

function baseUrl(): string {
  const functionName = requireEnvVar("IDENTITY_FUNCTION_NAME");
  return `https://${functionName}.azurewebsites.net/api/authenticateStorage`;
}
