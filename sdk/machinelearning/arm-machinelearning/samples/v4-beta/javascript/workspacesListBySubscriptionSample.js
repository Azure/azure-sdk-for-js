// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available machine learning workspaces under the specified subscription.
 *
 * @summary lists all the available machine learning workspaces under the specified subscription.
 * x-ms-original-file: 2025-12-01/Workspace/listBySubscription.json
 */
async function getWorkspacesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getWorkspacesBySubscription();
}

main().catch(console.error);
