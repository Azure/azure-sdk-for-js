// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary the operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Copy_BetweenRegions.json
 */
async function copyARestorePointToADifferentRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
async function createARestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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

async function main() {
  await copyARestorePointToADifferentRegion();
  await createARestorePoint();
}

main().catch(console.error);
