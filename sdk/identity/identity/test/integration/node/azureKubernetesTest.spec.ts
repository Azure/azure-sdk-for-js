// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { execSync } from "child_process";
import { isLiveMode } from "@azure-tools/test-recorder";

describe("Azure Kubernetes Integration test", function () {
  let podOutput: string;
  before(async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const resourceGroup = requireEnvVar("IDENTITY_RESOURCE_GROUP");
    const aksClusterName = requireEnvVar("IDENTITY_AKS_CLUSTER_NAME");
    const subscriptionId = requireEnvVar("IDENTITY_SUBSCRIPTION_ID");
    const podName = requireEnvVar("IDENTITY_AKS_POD_NAME");

    if (process.env.IDENTITY_CLIENT_SECRET) {
      // Log in as service principal in CI
      const clientId = requireEnvVar("IDENTITY_CLIENT_ID");
      const clientSecret = requireEnvVar("IDENTITY_CLIENT_SECRET");
      const tenantId = requireEnvVar("IDENTITY_TENANT_ID");
      runCommand(
        "az",
        `login --service-principal -u ${clientId} -p ${clientSecret} --tenant ${tenantId}`,
      );
    }

    runCommand("az", `account set --subscription ${subscriptionId}`);
    runCommand(
      "az",
      `aks get-credentials --resource-group ${resourceGroup} --name ${aksClusterName}`,
    );
    const pods = runCommand("kubectl", `get pods -o jsonpath='{.items[0].metadata.name}'`);
    assert.include(pods, podName);

    podOutput = runCommand("kubectl", `exec ${podName} -- node /app/index.js`);
  });

  it("can authenticate using managed identity", async function () {
    if (!isLiveMode()) {
      this.skip();
    }

    assert.include(
      podOutput,
      "ManagedIdentity: Successfully authenticated with storage",
      `Expected ${podOutput} to include a ManagedIdentity success message`,
    );
  });

  it("can authenticate using workload identity", async function () {
    if (!isLiveMode()) {
      this.skip();
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
