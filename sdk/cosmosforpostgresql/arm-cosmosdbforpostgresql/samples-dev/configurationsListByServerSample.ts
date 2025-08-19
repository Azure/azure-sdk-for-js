// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the configurations of a server in cluster.
 *
 * @summary List all the configurations of a server in cluster.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ConfigurationListByServer.json
 */

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listConfigurationsOfTheServerThatInTheCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestResourceGroup";
  const clusterName = "testcluster";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurations.listByServer(
    resourceGroupName,
    clusterName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listConfigurationsOfTheServerThatInTheCluster();
}

main().catch(console.error);
