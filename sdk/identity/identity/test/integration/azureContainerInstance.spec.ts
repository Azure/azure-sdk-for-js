// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert, describe, it } from "vitest";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";

describe("Azure Container Instance Integration test", function () {
  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const containerIp = requireEnvVar("IDENTITY_ACI_IP");
    if (!containerIp) {
      ctx.skip("set IDENTITY_ACI_IP to run this test");
      return;
    }

    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: `http://${containerIp}`,
      method: "GET",
    });
    request.allowInsecureConnection = true;
    const response = await client.sendRequest(request);

    // Debug: Log response details
    console.log("=== RESPONSE RECEIVED ===");
    console.log("ICP status:", containerIp);
    console.log("Response status:", response.status);
    console.log("Response headers:", JSON.stringify(response.headers.toJSON(), null, 2));
    console.log("Response body length:", response.bodyAsText?.length || 0);
    console.log(
      "Response body preview (first 500 chars):",
      response.bodyAsText?.substring(0, 500) || "No body",
    );

    if (response.bodyAsText && response.bodyAsText.length > 500) {
      console.log("Response body (full):", response.bodyAsText);
    }
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
