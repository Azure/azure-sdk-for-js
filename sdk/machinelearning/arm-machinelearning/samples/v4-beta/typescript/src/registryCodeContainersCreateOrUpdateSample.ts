// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Code container.
 *
 * @summary create or update Code container.
 * x-ms-original-file: 2025-12-01/Registry/CodeContainer/createOrUpdate.json
 */
async function createOrUpdateRegistryCodeContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeContainers.createOrUpdate(
    "testrg123",
    "testregistry",
    "testContainer",
    { properties: { description: "string", tags: { tag1: "value1", tag2: "value2" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryCodeContainer();
}

main().catch(console.error);
