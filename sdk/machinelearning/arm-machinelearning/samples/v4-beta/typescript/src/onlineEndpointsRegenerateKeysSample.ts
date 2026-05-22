// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
 *
 * @summary regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/regenerateKeys.json
 */
async function regenerateKeysWorkspaceOnlineEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.onlineEndpoints.regenerateKeys("test-rg", "my-aml-workspace", "testEndpointName", {
    keyType: "Primary",
    keyValue: "string",
  });
}

async function main(): Promise<void> {
  await regenerateKeysWorkspaceOnlineEndpoint();
}

main().catch(console.error);
