// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves the usages (most recent storage data) for the given collection, split by partition.
 *
 * @summary Retrieves the usages (most recent storage data) for the given collection, split by partition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBCollectionPartitionGetUsages.json
 */

import {
  CollectionPartitionListUsagesOptionalParams,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbCollectionGetUsages(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseRid = "databaseRid";
  const collectionRid = "collectionRid";
  const filter = "$filter=name.value eq 'Partition Storage'";
  const options: CollectionPartitionListUsagesOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectionPartition.listUsages(
    resourceGroupName,
    accountName,
    databaseRid,
    collectionRid,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDbCollectionGetUsages();
}

main().catch(console.error);
