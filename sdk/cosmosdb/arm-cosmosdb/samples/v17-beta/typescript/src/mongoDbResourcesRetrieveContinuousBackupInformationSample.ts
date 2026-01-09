// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContinuousBackupRestoreLocation} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves continuous backup information for a Mongodb collection.
 *
 * @summary Retrieves continuous backup information for a Mongodb collection.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBMongoDBCollectionBackupInformation.json
 */
async function cosmosDbMongoDbcollectionBackupInformation(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const collectionName = "collectionName";
  const location: ContinuousBackupRestoreLocation = {
    location: "North Europe",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginRetrieveContinuousBackupInformationAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      location,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbcollectionBackupInformation();
}

main().catch(console.error);
