// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update model container.
 *
 * @summary create or update model container.
 * x-ms-original-file: 2025-12-01/Registry/ModelContainer/createOrUpdate.json
 */
async function createOrUpdateRegistryModelContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryModelContainers.createOrUpdate(
    "testrg123",
    "registry123",
    "testContainer",
    {
      properties: {
        description: "Model container description",
        tags: { tag1: "value1", tag2: "value2" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryModelContainer();
}

main().catch(console.error);
