// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EndpointAuthKeys for an Endpoint using Key-based authentication.
 *
 * @summary list EndpointAuthKeys for an Endpoint using Key-based authentication.
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/listKeys.json
 */
async function listKeysWorkspaceOnlineEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineEndpoints.listKeys(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
  );
  console.log(result);
}

async function main() {
  await listKeysWorkspaceOnlineEndpoint();
}

main().catch(console.error);
