// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CassandraViewCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB Cassandra View
 *
 * @summary Create or update an Azure Cosmos DB Cassandra View
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBCassandraViewCreateUpdate.json
 */
async function cosmosDbCassandraViewCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspacename";
  const viewName = "viewname";
  const createUpdateCassandraViewParameters: CassandraViewCreateUpdateParameters =
    {
      options: {},
      resource: {
        id: "viewname",
        viewDefinition:
          "SELECT columna, columnb, columnc FROM keyspacename.srctablename WHERE columna IS NOT NULL AND columnc IS NOT NULL PRIMARY (columnc, columna)",
      },
      tags: {},
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginCreateUpdateCassandraViewAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
      viewName,
      createUpdateCassandraViewParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraViewCreateUpdate();
}

main().catch(console.error);
