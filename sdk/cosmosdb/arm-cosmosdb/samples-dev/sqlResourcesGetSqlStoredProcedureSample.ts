// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the SQL storedProcedure under an existing Azure Cosmos DB database account.
 *
 * @summary Gets the SQL storedProcedure under an existing Azure Cosmos DB database account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBSqlStoredProcedureGet.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbSqlStoredProcedureGet(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "containerName";
  const storedProcedureName = "storedProcedureName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlStoredProcedure(
    resourceGroupName,
    accountName,
    databaseName,
    containerName,
    storedProcedureName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlStoredProcedureGet();
}

main().catch(console.error);
