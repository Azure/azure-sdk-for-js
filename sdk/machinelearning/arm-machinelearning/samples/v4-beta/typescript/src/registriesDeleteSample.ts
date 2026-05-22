// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete registry
 *
 * @summary delete registry
 * x-ms-original-file: 2025-12-01/Registries/delete.json
 */
async function deleteRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.registries.delete("test-rg", "string");
}

async function main(): Promise<void> {
  await deleteRegistry();
}

main().catch(console.error);
