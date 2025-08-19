// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Removes the set of move resources included in the request body from move collection. The orchestration is done by service. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 *
 * @summary Removes the set of move resources included in the request body from move collection. The orchestration is done by service. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 * x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_BulkRemove.json
 */

import type {
  BulkRemoveRequest,
  MoveCollectionsBulkRemoveOptionalParams,
} from "@azure/arm-resourcemover";
import { ResourceMoverServiceAPI } from "@azure/arm-resourcemover";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function moveCollectionsBulkRemove(): Promise<void> {
  const subscriptionId = process.env["RESOURCEMOVER_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["RESOURCEMOVER_RESOURCE_GROUP"] || "rg1";
  const moveCollectionName = "movecollection1";
  const body: BulkRemoveRequest = {
    moveResources: [
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Migrate/MoveCollections/movecollection1/MoveResources/moveresource1",
    ],
    validateOnly: false,
  };
  const options: MoveCollectionsBulkRemoveOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new ResourceMoverServiceAPI(credential, subscriptionId);
  const result = await client.moveCollections.beginBulkRemoveAndWait(
    resourceGroupName,
    moveCollectionName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await moveCollectionsBulkRemove();
}

main().catch(console.error);
