// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary the operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: 2025-11-01/restorePointExamples/RestorePoint_Copy_BetweenRegions.json
 */
async function copyARestorePointToADifferentRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePoints.create("myResourceGroup", "rpcName", "rpName", {
    sourceRestorePoint: {
      id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/restorePointCollections/sourceRpcName/restorePoints/sourceRpName",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary the operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: 2025-11-01/restorePointExamples/RestorePoint_Create.json
 */
async function createARestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePoints.create("myResourceGroup", "rpcName", "rpName", {
    excludeDisks: [
      {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123",
      },
    ],
    instantAccessDurationMinutes: 120,
  });
  console.log(result);
}

async function main() {
  await copyARestorePointToADifferentRegion();
  await createARestorePoint();
}

main().catch(console.error);
