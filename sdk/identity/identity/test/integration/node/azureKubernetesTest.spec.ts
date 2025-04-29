// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { execSync } from "child_process";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach } from "vitest";

describe("Azure Kubernetes Integration test", function () {
  let podOutput: string;
  beforeEach(async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const podName = requireEnvVar("IDENTITY_AKS_POD_NAME");

    const pods = runCommand("kubectl", `get pods -o jsonpath='{.items[0].metadata.name}'`);
    assert.include(pods, podName);

    podOutput = runCommand("kubectl", `exec ${podName} -- node /app/index.js`);
  });

  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    assert.include(
      podOutput,
      "ManagedIdentity: Successfully authenticated with storage",
      `Expected ${podOutput} to include a ManagedIdentity success message`,
    );
  });

  it("can authenticate using workload identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    assert.include(
      podOutput,
      "WorkloadIdentity: Successfully authenticated with storage",
      `Expected ${podOutput} to include a WorkloadIdentity success message`,
    );
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
