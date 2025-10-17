// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update the restore point collection.
 *
 * @summary the operation to update the restore point collection.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Update_MaximumSet_Gen.json
 */
async function restorePointCollectionUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePointCollections.update("rgcompute", "aaaaaaaaaaaaaaaaaaaa", {
    properties: {
      source: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
      },
    },
    tags: { key8536: "aaaaaaaaaaaaaaaaaaa" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update the restore point collection.
 *
 * @summary the operation to update the restore point collection.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Update_MinimumSet_Gen.json
 */
async function restorePointCollectionUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePointCollections.update("rgcompute", "aaaaaaaaaaaaaaaaaa", {});
  console.log(result);
}

async function main() {
  await restorePointCollectionUpdateMaximumSetGen();
  await restorePointCollectionUpdateMinimumSetGen();
}

main().catch(console.error);
