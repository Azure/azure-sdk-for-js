// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates configuration of coordinator in a cluster
 *
 * @summary updates configuration of coordinator in a cluster
 * x-ms-original-file: 2023-03-02-preview/ConfigurationUpdateCoordinator.json
 */
async function updateSingleConfigurationOfCoordinator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.configurations.updateOnCoordinator(
    "TestResourceGroup",
    "testcluster",
    "array_nulls",
    { value: "on" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateSingleConfigurationOfCoordinator();
}

main().catch(console.error);
