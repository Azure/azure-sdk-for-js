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

  it("can authenticate using user-assigned managed identity", async function (ctx) {
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
      url: `http://${containerIp}/managed-identity/user-assigned`,
      method: "GET",
    });
    request.allowInsecureConnection = true;
    console.log("Testing user-assigned managed identity authentication...");
    const response = await client.sendRequest(request);

    console.log("User-assigned managed identity response:", response.bodyAsText);
    assert.strictEqual(
      response.status,
      200,
      `Expected status code 200, got ${response.status}. Response body: ${response.bodyAsText}`,
    );

    const responseBody = JSON.parse(response.bodyAsText || "{}");
    assert.strictEqual(responseBody.test, "user-assigned-managed-identity-success");

});

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
