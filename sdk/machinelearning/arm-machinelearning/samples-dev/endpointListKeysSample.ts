// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list keys for the endpoint resource.
 *
 * @summary list keys for the endpoint resource.
 * x-ms-original-file: 2026-03-15-preview/Endpoint/listKeys.json
 */
async function listEndpointKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.endpoint.listKeys("test-rg", "aml-workspace-name", "Azure.OpenAI");
  console.log(result);
}

async function main(): Promise<void> {
  await listEndpointKeys();
}

main().catch(console.error);
