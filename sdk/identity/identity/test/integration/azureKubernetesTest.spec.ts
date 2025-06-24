// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { execSync } from "child_process";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Azure Kubernetes Integration test", function () {
  let podName: string;
  const port = requireEnvVar("IDENTITY_FUNCTIONS_CUSTOMHANDLER_PORT");

  beforeEach(async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    podName = requireEnvVar("IDENTITY_AKS_POD_NAME");
    const pods = runCommand("kubectl", `get pods -o jsonpath='{.items[0].metadata.name}'`);
    assert.include(pods, podName);
    console.log(`Using port: ${port} and pod: ${podName}`);

    // Wait a moment for cleanup
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check server status
    console.log("Checking server status...");
    const statusResponse = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/`,
    );

    console.log("Server Status Response:", statusResponse);

    let statusObj: any;
    try {
      statusObj = JSON.parse(statusResponse);
    } catch (error) {
      throw new Error(`Failed to parse server status response as JSON: ${statusResponse}`);
    }
    console.log("Parsed Status Object:", statusObj);
    assert.equal(statusObj.status, "OK", "Server is not responding with OK status");
    assert.equal(
      statusObj.service,
      "Azure Identity Test Service",
      "Unexpected service name in status response",
    );
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
    const response = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/managed-identity`,
    );

    console.log("Managed Identity Response:", response);

    let responseObj: any;
    try {
      responseObj = JSON.parse(response);
    } catch (error) {
      throw new Error(`Failed to parse response as JSON: ${response}`);
    }

    assert.equal(responseObj.test, "managed-identity-success");
  });

  it("can authenticate using workload identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    console.log("Testing workload identity endpoint...");
    const response = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/workload-identity`,
    );

    console.log("Workload Identity Response:", response);

    let responseObj: any;
    try {
      responseObj = JSON.parse(response);
    } catch (error) {
      throw new Error(`Failed to parse response as JSON: ${response}`);
    }

    assert.equal(responseObj.test, "workload-identity-success");
  });

  it("can authenticate using user-assigned managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    console.log("Testing user-assigned managed identity endpoint...");
    const response = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/managed-identity/user-assigned`,
    );

    console.log("User-Assigned Managed Identity Response:", response);

    let responseObj: any;
    try {
      responseObj = JSON.parse(response);
    } catch (error) {
      throw new Error(`Failed to parse response as JSON: ${response}`);
    }

    assert.equal(responseObj.test, "user-assigned-managed-identity-success");
  });
});

function runCommand(command: string, args: string = ""): any {
  try {
    const output = execSync(`${command} ${args}`).toString().trim();
    console.log(output.toString());
    return output;
  } catch (error: any) {
    console.error("Command failed:", error.message);
    console.error("Exit code:", error.status);
    console.error("stderr:", error.stderr.toString());
  }
}

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
