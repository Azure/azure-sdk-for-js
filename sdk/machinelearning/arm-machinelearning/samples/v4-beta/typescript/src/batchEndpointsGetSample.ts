// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a batch inference endpoint by name.
 *
 * @summary gets a batch inference endpoint by name.
 * x-ms-original-file: 2025-12-01/Workspace/BatchEndpoint/get.json
 */
async function getWorkspaceBatchEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.batchEndpoints.get("test-rg", "my-aml-workspace", "testEndpointName");
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspaceBatchEndpoint();
}

main().catch(console.error);
