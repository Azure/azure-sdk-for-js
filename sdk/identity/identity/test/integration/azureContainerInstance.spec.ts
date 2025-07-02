// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert, describe, it } from "vitest";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

describe("Azure Container Instance Integration test", function () {

  // Helper function to get container logs
  async function getContainerLogs(): Promise<void> {
    const containerName = process.env["IDENTITY_CONTAINER_INSTANCE_NAME"];
    const resourceGroup = process.env["IDENTITY_RESOURCE_GROUP"];
    console.log("Container Name:", containerName);
    console.log("Resource Group:", resourceGroup);
    if (containerName && resourceGroup) {
      try {
        console.log(`Fetching logs for container: ${containerName} in resource group: ${resourceGroup}`);
        const { stdout, stderr } = await execAsync(`az container logs --resource-group "${resourceGroup}" --name "${containerName}"`);
        console.log(stdout);
        if (stderr) {
          console.log(stderr);
        }
      } catch (logError: any) {
        console.log("Failed to fetch container logs:", logError.message);
        console.log("Error details:", logError);
      }
    } else {
      console.log(`Container name or resource group not available for log collection. IDENTITY_CONTAINER_INSTANCE_NAME: ${process.env["IDENTITY_CONTAINER_INSTANCE_NAME"]}, IDENTITY_RESOURCE_GROUP: ${process.env["IDENTITY_RESOURCE_GROUP"]}`);
    }
  }

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

    try {
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
    } catch (error) {
      console.log("Test failed, collecting container logs...");
      await getContainerLogs();
      throw error;
    }
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

    try {
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
    } catch (error) {
      console.log("User-assigned managed identity test failed, collecting container logs...");
      await getContainerLogs();
      throw error;
    }
  });

  it("can authenticate using system-assigned managed identity endpoint", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const containerIp = requireEnvVar("IDENTITY_ACI_IP");
    if (!containerIp) {
      ctx.skip("set IDENTITY_ACI_IP to run this test");
      return;
    }

    try {
      const client = createDefaultHttpClient();
      const request = createPipelineRequest({
        url: `http://${containerIp}/managed-identity`,
        method: "GET",
      });
      request.allowInsecureConnection = true;
      console.log("Testing system-assigned managed identity authentication...");
      const response = await client.sendRequest(request);

      console.log("System-assigned managed identity response:", response.bodyAsText);

      // Even if we get a 500 error, we want to see what the error details are
      if (response.status !== 200) {
        console.log(`Got status ${response.status}, checking error details...`);
        await getContainerLogs();

        // Try to parse the error response
        try {
          const errorBody = JSON.parse(response.bodyAsText || "{}");
          console.log("Error details from response:", JSON.stringify(errorBody, null, 2));
        } catch (parseError) {
          console.log("Could not parse error response as JSON:", response.bodyAsText);
        }
      }

      assert.strictEqual(
        response.status,
        200,
        `Expected status code 200, got ${response.status}. Response body: ${response.bodyAsText}`,
      );

      const responseBody = JSON.parse(response.bodyAsText || "{}");
      assert.strictEqual(responseBody.test, "managed-identity-success");
    } catch (error) {
      console.log("System-assigned managed identity test failed, collecting container logs...");
      await getContainerLogs();
      throw error;
    }
  });
});

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
