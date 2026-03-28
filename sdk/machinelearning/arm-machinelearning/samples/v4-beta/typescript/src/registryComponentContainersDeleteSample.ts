// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete container.
 *
 * @summary delete container.
 * x-ms-original-file: 2025-12-01/Registry/ComponentContainer/delete.json
 */
async function deleteRegistryComponentContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.registryComponentContainers.delete("test-rg", "my-aml-registry", "string");
}

async function main(): Promise<void> {
  await deleteRegistryComponentContainer();
}

main().catch(console.error);
