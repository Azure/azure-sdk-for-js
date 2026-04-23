// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Deployment stack with the given name.
 *
 * @summary gets the Deployment stack with the given name.
 * x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupGet.json
 */
async function getAResourceGroupDeploymentStack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacks.getAtResourceGroup(
    "deploymentStacksRG",
    "simpleDeploymentStack",
  );
  console.log(result);
}

async function main() {
  await getAResourceGroupDeploymentStack();
}

main().catch(console.error);
