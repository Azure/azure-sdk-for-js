// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information of a configuration for coordinator.
 *
 * @summary gets information of a configuration for coordinator.
 * x-ms-original-file: 2023-03-02-preview/ConfigurationGetCoordinator.json
 */
async function getConfigurationDetailsForCoordinator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.configurations.getCoordinator(
    "TestResourceGroup",
    "testcluster",
    "array_nulls",
  );
  console.log(result);
}

async function main() {
  await getConfigurationDetailsForCoordinator();
}

main().catch(console.error);
