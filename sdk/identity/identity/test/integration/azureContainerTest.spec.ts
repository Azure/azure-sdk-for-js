// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert } from "vitest";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";

describe("Azure Container Instance Integration test", function () {
  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    const containerIp = process.env.IDENTITY_ACI_IP;
    if (!containerIp) {
      ctx.skip("set IDENTITY_ACI_IP to run this test");
      return;
    }
    console.log(`Container IP: ${containerIp}`);
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: `http://${containerIp}`,
      method: "GET",
    });
    request.allowInsecureConnection = true;

    console.log("Sending request to container", JSON.stringify(request, null, 2));
    const response = await client.sendRequest(request);

    console.log("Receiving", JSON.stringify(response, null, 2));
    assert.strictEqual(
      response.status,
      200,
      `Expected status code 200, got ${response.status}. Response body: ${response.bodyAsText}`,
    );
  });
});
