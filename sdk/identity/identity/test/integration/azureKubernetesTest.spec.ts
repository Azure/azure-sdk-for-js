// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { assert } from "chai";
import { execSync } from "child_process";
import { isLiveMode } from "@azure-tools/test-recorder";

describe("Azure Kubernetes Integration test", function () {
  it("can fetch a token", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }

    const clientId = requireEnvVar("IDENTITY_CLIENT_ID");
    const clientSecret = requireEnvVar("IDENTITY_CLIENT_SECRET");
    const tenantId = requireEnvVar("IDENTITY_TENANT_ID");
    const resourceGroup = requireEnvVar("IDENTITY_RESOURCE_GROUP");
    const aksClusterName = requireEnvVar("IDENTITY_AKS_CLUSTER_NAME");
    const subscriptionId = requireEnvVar("IDENTITY_SUBSCRIPTION_ID");
    const podName = requireEnvVar("IDENTITY_POD_NAME");

    const azPath = runCommand(`which az`);
    const kubectlPath = runCommand(`which kubectl`);

    runCommand(
      azPath,
      `login --service-principal -u ${clientId} -p ${clientSecret} --tenant ${tenantId}`,
    );

    runCommand(azPath, `account set --subscription ${subscriptionId}`);
    runCommand(
      azPath,
      `aks get-credentials --resource-group ${resourceGroup} --name ${aksClusterName}`,
    );
    const pods = runCommand(kubectlPath, `get pods -o jsonpath='{.items[0].metadata.name}'`);
    assert.include(pods, podName);

    const podOutput = runCommand(kubectlPath, `exec ${podName} -- node /app/index.js`);
    console.log({ podOutput });
    assert.equal(podOutput, "Successfully authenticated with storage");
  });
});

function runCommand(command: string, args: string = ""): string {
  return execSync(`${command} ${args}`).toString();
}

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
