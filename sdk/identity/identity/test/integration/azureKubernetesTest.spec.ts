// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execSync } from "child_process";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { requireEnvVar } from "../authTestUtils.js";

describe.skipIf(!isLiveMode())("Azure Kubernetes Integration test", function () {
  let podName: string;
  let identityBindingPodName: string;
  const port = requireEnvVar("IDENTITY_FUNCTIONS_CUSTOMHANDLER_PORT");

  beforeEach(async function () {
    podName = requireEnvVar("IDENTITY_AKS_POD_NAME");
    identityBindingPodName = requireEnvVar("IDENTITY_AKS_IDENTITY_BINDING_POD_NAME");
    await assertPodIsReady(podName, port);
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

  it.skipIf(!isLiveMode())("can authenticate using identity binding", async function () {
    await assertPodIsReady(identityBindingPodName, port);
    const response = runCommand(
      "kubectl",
      `exec ${identityBindingPodName} -- wget -qO- http://localhost:${port}/workload-identity/identity-binding`,
    );

    const responseObj = JSON.parse(response);
    assert.isTrue(responseObj.success);
  });

  it.skipIf(!isLiveMode())(
    "can authenticate using user-assigned managed identity",
    async function () {
      const response = runCommand(
        "kubectl",
        `exec ${podName} -- wget -qO- http://localhost:${port}/managed-identity/user-assigned`,
      );

      const responseObj = JSON.parse(response);
      assert.isTrue(responseObj.success);
    },
  );

  it.skipIf(!isLiveMode())(
    "can authenticate using user-assigned DefaultAzureCredential",
    async function () {
      const response = runCommand(
        "kubectl",
        `exec ${podName} -- wget -qO- http://localhost:${port}/default-azure-credential/user-assigned`,
      );

      const responseObj = JSON.parse(response);
      assert.isTrue(responseObj.success);
    },
  );
});

async function assertPodIsReady(podName: string, port: string): Promise<void> {
  runCommand("kubectl", `wait --for=condition=Ready pod/${podName} --timeout=5m`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const statusResponse = runCommand(
    "kubectl",
    `exec ${podName} -- wget -qO- http://localhost:${port}/`,
  );

  const statusObj = JSON.parse(statusResponse);
  assert.equal(statusObj.status, "OK");
}

function runCommand(command: string, args: string = ""): any {
  try {
    const output = execSync(`${command} ${args}`).toString().trim();
    console.log(output.toString());
    return output;
  } catch (error: any) {
    console.error("Command failed:", error.message);
    console.error("Exit code:", error.status);
    console.error("stderr:", error.stderr.toString());
    throw error;
  }
}
