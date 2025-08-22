// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB SQL userDefinedFunction
 *
 * @summary Create or update an Azure Cosmos DB SQL userDefinedFunction
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBSqlUserDefinedFunctionCreateUpdate.json
 */

import {
  SqlUserDefinedFunctionCreateUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbSqlUserDefinedFunctionCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "containerName";
  const userDefinedFunctionName = "userDefinedFunctionName";
  const createUpdateSqlUserDefinedFunctionParameters: SqlUserDefinedFunctionCreateUpdateParameters =
    { options: {}, resource: { body: "body", id: "userDefinedFunctionName" } };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.sqlResources.beginCreateUpdateSqlUserDefinedFunctionAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      containerName,
      userDefinedFunctionName,
      createUpdateSqlUserDefinedFunctionParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlUserDefinedFunctionCreateUpdate();
}

main().catch(console.error);
