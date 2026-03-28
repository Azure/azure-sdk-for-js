// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get registry
 *
 * @summary get registry
 * x-ms-original-file: 2025-12-01/Registries/get.json
 */
async function getRegistryWithSystemCreatedAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registries.get("test-rg", "string");
  console.log(result);
}

async function main(): Promise<void> {
  await getRegistryWithSystemCreatedAccounts();
}

main().catch(console.error);
