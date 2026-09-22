// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceClient } from "@azure/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert } from "vitest";
import { requireEnvVar } from "../authTestUtils.js";

describe("AzureWebApps Integration test", function () {
  it.skipIf(!isLiveMode())(
    "test the Azure Web Apps endpoint where the MI credential is used.",
    async function () {
      const baseUri = baseUrl();
      const client = new ServiceClient({ baseUri: baseUri });
      const pipelineRequest = createPipelineRequest({
        url: baseUri,
        method: "GET",
      });
      const response = await client.sendRequest(pipelineRequest);
      console.log(response.bodyAsText);
      assert.equal(response.status, 200, `Expected status 200. Received ${response.status}`);
    },
  );
});

function baseUrl(): string {
  const webAppName = requireEnvVar("IDENTITY_WEBAPP_NAME");
  return `https://${webAppName}.azurewebsites.net/sync`;
}
