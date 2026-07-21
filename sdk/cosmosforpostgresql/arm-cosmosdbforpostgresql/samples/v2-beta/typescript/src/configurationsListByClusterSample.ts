// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the configurations of a cluster.
 *
 * @summary list all the configurations of a cluster.
 * x-ms-original-file: 2023-03-02-preview/ConfigurationListByCluster.json
 */
async function listConfigurationsOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurations.listByCluster(
    "TestResourceGroup",
    "testcluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConfigurationsOfTheCluster();
}

main().catch(console.error);
