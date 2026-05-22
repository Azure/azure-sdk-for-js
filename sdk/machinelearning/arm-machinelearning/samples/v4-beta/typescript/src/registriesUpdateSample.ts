// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update tags
 *
 * @summary update tags
 * x-ms-original-file: 2025-12-01/Registries/update.json
 */
async function updateRegistryWithSystemCreatedAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registries.update("test-rg", "string", {
    identity: { type: "SystemAssigned", userAssignedIdentities: { string: {} } },
    sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Basic" },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateRegistryWithSystemCreatedAccounts();
}

main().catch(console.error);
