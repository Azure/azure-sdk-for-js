// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to called by end-users to get all PE connections.
 *
 * @summary called by end-users to get all PE connections.
 * x-ms-original-file: 2025-12-01/PrivateEndpointConnection/list.json
 */
async function storageAccountListPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("rg-1234", "testworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageAccountListPrivateEndpointConnections();
}

main().catch(console.error);
