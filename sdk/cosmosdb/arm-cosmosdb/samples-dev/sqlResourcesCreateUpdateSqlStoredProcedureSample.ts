// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL storedProcedure
 *
 * @summary create or update an Azure Cosmos DB SQL storedProcedure
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlStoredProcedureCreateUpdate.json
 */
async function cosmosDBSqlStoredProcedureCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlStoredProcedure(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    "storedProcedureName",
    { options: {}, resource: { body: "body", id: "storedProcedureName" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlStoredProcedureCreateUpdate();
}

main().catch(console.error);
