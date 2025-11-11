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
      return ctx.skip();
    }

    podName = requireEnvVar("IDENTITY_AKS_POD_NAME");
    const pods = runCommand("kubectl", `get pods -o jsonpath='{.items[0].metadata.name}'`);
    assert.include(pods, podName);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check server status
    const statusResponse = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/`,
    );

    const statusObj = JSON.parse(statusResponse);
    assert.equal(statusObj.status, "OK");
  });

  afterEach(async function () {
    if (!isLiveMode()) {
      return;
    }
  });

  it.skipIf(!isLiveMode())("can authenticate using workload identity", async function () {
    const response = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/workload-identity`,
    );

    const responseObj = JSON.parse(response);
    assert.isTrue(responseObj.success);
  });

  it.skipIf(!isLiveMode())("can authenticate using user-assigned managed identity", async function () {

    const response = runCommand(
      "kubectl",
      `exec ${podName} -- wget -qO- http://localhost:${port}/managed-identity/user-assigned`,
    );

    const responseObj = JSON.parse(response);
    assert.isTrue(responseObj.success);
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
