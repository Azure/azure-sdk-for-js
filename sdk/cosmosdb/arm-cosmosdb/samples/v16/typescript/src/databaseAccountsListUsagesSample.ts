// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DatabaseAccountsListUsagesOptionalParams} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the usages (most recent data) for the given database account.
 *
 * @summary Retrieves the usages (most recent data) for the given database account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBDatabaseAccountGetUsages.json
 */
async function cosmosDbDatabaseAccountGetUsages(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const filter = "$filter=name.value eq 'Storage'";
  const options: DatabaseAccountsListUsagesOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseAccounts.listUsages(
    resourceGroupName,
    accountName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDbDatabaseAccountGetUsages();
}

main().catch(console.error);
