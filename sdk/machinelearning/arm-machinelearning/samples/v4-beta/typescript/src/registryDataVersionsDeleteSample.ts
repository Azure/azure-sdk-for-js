// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete version.
 *
 * @summary delete version.
 * x-ms-original-file: 2025-12-01/Registry/DataVersionBase/delete.json
 */
async function deleteRegistryDataVersionBase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.registryDataVersions.delete("test-rg", "registryName", "string", "string");
}

async function main(): Promise<void> {
  await deleteRegistryDataVersionBase();
}

main().catch(console.error);
