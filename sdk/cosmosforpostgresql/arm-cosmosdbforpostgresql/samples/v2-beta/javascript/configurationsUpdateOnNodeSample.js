// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates configuration of worker nodes in a cluster
 *
 * @summary updates configuration of worker nodes in a cluster
 * x-ms-original-file: 2023-03-02-preview/ConfigurationUpdateNode.json
 */
async function updateSingleConfigurationOfNodes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.configurations.updateOnNode(
    "TestResourceGroup",
    "testcluster",
    "array_nulls",
    { value: "off" },
  );
  console.log(result);
}

async function main() {
  await updateSingleConfigurationOfNodes();
}

main().catch(console.error);
