// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information of a configuration for coordinator and nodes.
 *
 * @summary gets information of a configuration for coordinator and nodes.
 * x-ms-original-file: 2023-03-02-preview/ConfigurationGet.json
 */
async function getConfigurationDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.configurations.get(
    "TestResourceGroup",
    "testcluster",
    "client_encoding",
  );
  console.log(result);
}

async function main() {
  await getConfigurationDetails();
}

main().catch(console.error);
