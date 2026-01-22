// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert } from "vitest";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";

describe("AzureVM UserAssigned Integration test", function () {
  it.skipIf(!isLiveMode())("live IMDS test", async function () {
    const identityVMIP = process.env.IDENTITY_VM_PUBLIC_IP;
    if (!identityVMIP) {
      console.log("IDENTITY_VM_PUBLIC_IP is not set");
      throw new Error("IDENTITY_VM_PUBLIC_IP is not set");
    }
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: `http://${identityVMIP}`,
      method: "GET",
    });
    request.allowInsecureConnection = true;

    const response = await client.sendRequest(request);

    assert.strictEqual(
      response.status,
      200,
      `Expected status code 200, got ${response.status}. Response body: ${response.bodyAsText}`,
    );
  });
});
