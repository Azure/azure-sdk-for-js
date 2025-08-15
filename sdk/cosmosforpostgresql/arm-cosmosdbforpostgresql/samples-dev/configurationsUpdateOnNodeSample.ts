// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServerConfiguration } from "@azure/arm-cosmosdbforpostgresql";
import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates configuration of worker nodes in a cluster
 *
 * @summary Updates configuration of worker nodes in a cluster
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/ConfigurationUpdateNode.json
 */
async function updateSingleConfigurationOfNodes(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestResourceGroup";
  const clusterName = "testcluster";
  const configurationName = "array_nulls";
  const parameters: ServerConfiguration = { value: "off" };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.configurations.beginUpdateOnNodeAndWait(
    resourceGroupName,
    clusterName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateSingleConfigurationOfNodes();
}

main().catch(console.error);
