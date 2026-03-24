// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update container.
 *
 * @summary create or update container.
 * x-ms-original-file: 2025-12-01/Registry/ComponentContainer/createOrUpdate.json
 */
async function createOrUpdateRegistryComponentContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryComponentContainers.createOrUpdate(
    "test-rg",
    "my-aml-registry",
    "string",
    {
      properties: {
        description: "string",
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryComponentContainer();
}

main().catch(console.error);
