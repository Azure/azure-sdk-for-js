// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Online Endpoint (asynchronous).
 *
 * @summary delete Online Endpoint (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/delete.json
 */
async function deleteWorkspaceOnlineEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.onlineEndpoints.delete("test-rg", "my-aml-workspace", "testEndpointName");
}

async function main() {
  await deleteWorkspaceOnlineEndpoint();
}

main().catch(console.error);
