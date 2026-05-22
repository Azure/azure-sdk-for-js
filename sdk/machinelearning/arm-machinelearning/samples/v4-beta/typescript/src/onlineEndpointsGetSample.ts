// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Online Endpoint.
 *
 * @summary get Online Endpoint.
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/get.json
 */
async function getWorkspaceOnlineEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineEndpoints.get(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspaceOnlineEndpoint();
}

main().catch(console.error);
