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
    if (containerName && resourceGroup) {
      try {
        // First, check if we're already logged in
        try {
          await execAsync('az account show');
        } catch (authError: any) {
          if (authError.message.includes('az login')) {
            try {
              // Try to login using service principal if environment variables are available
              const clientId = process.env["AZURE_CLIENT_ID"];
              const clientSecret = process.env["AZURE_CLIENT_SECRET"];
              const tenantId = process.env["AZURE_TENANT_ID"];

              if (clientId && clientSecret && tenantId) {
                await execAsync(`az login --service-principal -u "${clientId}" -p "${clientSecret}" --tenant "${tenantId}"`);
              } else {
                return;
              }
            } catch (loginError: any) {
              return;
            }
          } else {
            throw authError;
          }
        }

        const { stdout, stderr } = await execAsync(`az container logs --resource-group "${resourceGroup}" --name "${containerName}"`);
        console.log(stdout);
        if (stderr) {
          console.log(stderr);
        }
      } catch (logError: any) {
        // Silent failure for log collection
      }
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

    try {
      const client = createDefaultHttpClient();
      const request = createPipelineRequest({
        url: `http://${containerIp}`,
        method: "GET",
      });
      request.allowInsecureConnection = true;
      const response = await client.sendRequest(request);

      assert.strictEqual(
        response.status,
        200,
        `Expected status code 200, got ${response.status}. Response body: ${response.bodyAsText}`,
      );
    } catch (error) {
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
      const response = await client.sendRequest(request);

      assert.strictEqual(
        response.status,
        200,
        `Expected status code 200, got ${response.status}. Response body: ${response.bodyAsText}`,
      );

      const responseBody = JSON.parse(response.bodyAsText || "{}");
      assert.strictEqual(responseBody.test, "user-assigned-managed-identity-success");
    } catch (error) {
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
      const response = await client.sendRequest(request);

      // Even if we get a 500 error, we want to see what the error details are
      if (response.status !== 200) {
        await getContainerLogs();

        // Try to parse the error response
        try {
          JSON.parse(response.bodyAsText || "{}");
        } catch (parseError) {
          // Silent failure for JSON parsing
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
