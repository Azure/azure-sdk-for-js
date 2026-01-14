// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RestorableMongodbCollectionsListOptionalParams} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB collections under a specific database.  This helps in scenario where container was accidentally deleted.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @summary Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB collections under a specific database.  This helps in scenario where container was accidentally deleted.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBRestorableMongodbCollectionList.json
 */
async function cosmosDbRestorableMongodbCollectionList(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const location = "WestUS";
  const instanceId = "98a570f2-63db-4117-91f0-366327b7b353";
  const restorableMongodbDatabaseRid = "PD5DALigDgw=";
  const options: RestorableMongodbCollectionsListOptionalParams = {
    restorableMongodbDatabaseRid,
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableMongodbCollections.list(
    location,
    instanceId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDbRestorableMongodbCollectionList();
}

main().catch(console.error);
