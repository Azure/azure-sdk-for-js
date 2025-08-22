// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the move collection.
 *
 * @summary Gets the move collection.
 * x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Get.json
 */

import { ResourceMoverServiceAPI } from "@azure/arm-resourcemover";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function moveCollectionsGet(): Promise<void> {
  const subscriptionId = process.env["RESOURCEMOVER_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["RESOURCEMOVER_RESOURCE_GROUP"] || "rg1";
  const moveCollectionName = "movecollection1";
  const credential = new DefaultAzureCredential();
  const client = new ResourceMoverServiceAPI(credential, subscriptionId);
  const result = await client.moveCollections.get(resourceGroupName, moveCollectionName);
  console.log(result);
}

async function main(): Promise<void> {
  await moveCollectionsGet();
}

main().catch(console.error);
