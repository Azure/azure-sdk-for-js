// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Online Endpoint (asynchronous).
 *
 * @summary update Online Endpoint (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/update.json
 */
async function updateWorkspaceOnlineEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineEndpoints.update(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    { identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } }, tags: {} },
  );
  console.log(result);
}

async function main() {
  await updateWorkspaceOnlineEndpoint();
}

main().catch(console.error);
