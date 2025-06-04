// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { execSync } from "child_process";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Azure Kubernetes Integration test", function () {
  let podName: string;
  const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || 8080;

  beforeEach(async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    podName = requireEnvVar("IDENTITY_AKS_POD_NAME");
    const pods = runCommand("kubectl", `get pods -o jsonpath='{.items[0].metadata.name}'`);
    assert.include(pods, podName);

    // Check server status
    console.log("Checking server status...");
    const statusResponse = runCommand("kubectl", `exec ${podName} -- wget -qO- http://localhost:${port}/`);

    console.log("Server Status Response:", statusResponse);

    let statusObj: any;
    try {
      statusObj = JSON.parse(statusResponse);
    } catch (error) {
      throw new Error(`Failed to parse server status response as JSON: ${statusResponse}`);
    }

    assert.equal(statusObj.status, "OK", "Server is not responding with OK status");
    assert.equal(statusObj.service, "Azure Identity Test Service", "Unexpected service name in status response");
  });

  afterEach(async function () {
    if (!isLiveMode()) {
      return;
    }
  });

  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    console.log("Testing managed identity endpoint...");

    try {
      const response = runCommand("kubectl", `exec ${podName} -- wget -qO- http://localhost:${port}/managed-identity`);
      console.log("Managed Identity Response:", response);

      let responseObj: any;
      try {
        responseObj = JSON.parse(response);
      } catch (error) {
        console.log("Failed to parse JSON, checking logs...");
        const logs = runCommand("kubectl", `logs ${podName} --tail=10`);
        console.log("Pod logs:", logs);
        throw new Error(`Failed to parse response as JSON: ${response}`);
      }

      assert.equal(responseObj.test, "managed-identity");

      if (responseObj.error) {
        console.log("Pod logs for debugging:");
        const logs = runCommand("kubectl", `logs ${podName} --tail=20`);
        console.log(logs);
        throw new Error(`Managed identity test failed: ${responseObj.error}`);
      }
    } catch (error: any) {
      if (error.message.includes('wget:') || error.message.includes('HTTP status')) {
        console.log("HTTP error detected, checking pod logs...");
        const logs = runCommand("kubectl", `logs ${podName} --tail=20`);
        console.log("Pod logs:", logs);
      }
      throw error;
    }
  });

  it("can authenticate using workload identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    console.log("Testing workload identity endpoint...");

    try {
      const response = runCommand("kubectl", `exec ${podName} -- wget -qO- http://localhost:${port}/workload-identity`);
      console.log("Workload Identity Response:", response);

      let responseObj: any;
      try {
        responseObj = JSON.parse(response);
      } catch (error) {
        console.log("Failed to parse JSON, checking logs...");
        const logs = runCommand("kubectl", `logs ${podName} --tail=10`);
        console.log("Pod logs:", logs);
        throw new Error(`Failed to parse response as JSON: ${response}`);
      }

      assert.equal(responseObj.test, "workload-identity");

      if (responseObj.error) {
        console.log("Pod logs for debugging:");
        const logs = runCommand("kubectl", `logs ${podName} --tail=20`);
        console.log(logs);
        throw new Error(`Workload identity test failed: ${responseObj.error}`);
      }
    } catch (error: any) {
      if (error.message.includes('wget:') || error.message.includes('HTTP status')) {
        console.log("HTTP error detected, checking pod logs...");
        const logs = runCommand("kubectl", `logs ${podName} --tail=20`);
        console.log("Pod logs:", logs);
      }
      throw error;
    }
  });

  it("can authenticate using user-assigned managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    console.log("Testing user-assigned managed identity endpoint...");

    try {
      const response = runCommand("kubectl", `exec ${podName} -- wget -qO- http://localhost:${port}/managed-identity/user-assigned`);
      console.log("User-Assigned Managed Identity Response:", response);

      let responseObj: any;
      try {
        responseObj = JSON.parse(response);
      } catch (error) {
        console.log("Failed to parse JSON, checking logs...");
        const logs = runCommand("kubectl", `logs ${podName} --tail=10`);
        console.log("Pod logs:", logs);
        throw new Error(`Failed to parse response as JSON: ${response}`);
      }

      assert.equal(responseObj.test, "user-assigned-managed-identity");

      if (responseObj.error) {
        console.log("Pod logs for debugging:");
        const logs = runCommand("kubectl", `logs ${podName} --tail=20`);
        console.log(logs);
        throw new Error(`User-assigned managed identity test failed: ${responseObj.error}`);
      }
    } catch (error: any) {
      if (error.message.includes('wget:') || error.message.includes('HTTP status')) {
        console.log("HTTP error detected, checking pod logs...");
        const logs = runCommand("kubectl", `logs ${podName} --tail=20`);
        console.log("Pod logs:", logs);
      }
      throw error;
    }
  });
});

function runCommand(command: string, args: string = ""): string {
  return execSync(`${command} ${args}`).toString().trim();
}

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
