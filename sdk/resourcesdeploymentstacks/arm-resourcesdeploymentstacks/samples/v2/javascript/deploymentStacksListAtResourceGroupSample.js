// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Deployment stacks at the specified scope.
 *
 * @summary lists Deployment stacks at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupList.json
 */
async function listResourceGroupDeploymentStacks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deploymentStacks.listAtResourceGroup("deploymentStacksRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listResourceGroupDeploymentStacks();
}

main().catch(console.error);
