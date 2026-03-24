// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to called by end-users to get a PE connection.
 *
 * @summary called by end-users to get a PE connection.
 * x-ms-original-file: 2025-12-01/PrivateEndpointConnection/get.json
 */
async function workspaceGetPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rg-1234",
    "testworkspace",
    "{privateEndpointConnectionName}",
  );
  console.log(result);
}

async function main() {
  await workspaceGetPrivateEndpointConnection();
}

main().catch(console.error);
