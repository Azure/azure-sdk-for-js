// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isLiveMode } from "@azure-tools/test-recorder";
import { assert, describe, it } from "vitest";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";

describe("Azure Container Instance Integration test", function () {
  it.skipIf(!isLiveMode())("can authenticate using managed identity", async function (ctx) {
    const containerIp = requireEnvVar("IDENTITY_ACI_IP");

    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: `http://${containerIp}/managed-identity/user-assigned`,
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

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
