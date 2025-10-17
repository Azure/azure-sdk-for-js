// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary the operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Copy_BetweenRegions.json
 */
async function copyARestorePointToADifferentRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.restorePoints.create("myResourceGroup", "rpcName", "rpName", {
    properties: {
      sourceRestorePoint: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/restorePointCollections/sourceRpcName/restorePoints/sourceRpName",
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary the operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Create.json
 */
async function createARestorePoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.restorePoints.create("myResourceGroup", "rpcName", "rpName", {
    properties: {
      excludeDisks: [
        {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123",
        },
      ],
    },
  });
}

async function main(): Promise<void> {
  await copyARestorePointToADifferentRegion();
  await createARestorePoint();
}

main().catch(console.error);
