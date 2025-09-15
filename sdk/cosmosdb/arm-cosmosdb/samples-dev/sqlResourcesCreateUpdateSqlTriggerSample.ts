// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB SQL trigger
 *
 * @summary Create or update an Azure Cosmos DB SQL trigger
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBSqlTriggerCreateUpdate.json
 */

import {
  SqlTriggerCreateUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbSqlTriggerCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "containerName";
  const triggerName = "triggerName";
  const createUpdateSqlTriggerParameters: SqlTriggerCreateUpdateParameters = {
    options: {},
    resource: {
      body: "body",
      id: "triggerName",
      triggerOperation: "triggerOperation",
      triggerType: "triggerType",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.beginCreateUpdateSqlTriggerAndWait(
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    triggerName,
    createUpdateSqlTriggerParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlTriggerCreateUpdate();
}

main().catch(console.error);
