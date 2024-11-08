// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceClient } from "@azure/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert } from "chai";
import type { Context } from "mocha";
import { isLiveMode } from "@azure-tools/test-recorder";

describe("AzureWebApps Integration test", function () {
  it("test the Azure Web Apps endpoint where the MI credential is used.", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const baseUri = baseUrl();
    const client = new ServiceClient({ baseUri: baseUri });
    const pipelineRequest = createPipelineRequest({
      url: baseUri,
      method: "GET",
    });
    const response = await client.sendRequest(pipelineRequest);
    console.log(response.bodyAsText);
    assert.equal(response.status, 200, `Expected status 200. Received ${response.status}`);
  });
});

function baseUrl(): string {
  const webAppName = process.env.IDENTITY_WEBAPP_NAME;
  if (!webAppName) {
    console.log("IDENTITY_WEBAPP_NAME is not set");
    throw new Error("IDENTITY_WEBAPP_NAME is not set");
  }
  return `https://${webAppName}.azurewebsites.net/sync`;
}
