// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the restore point collection. This operation will also delete all the contained restore points.
 *
 * @summary the operation to delete the restore point collection. This operation will also delete all the contained restore points.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Delete_MaximumSet_Gen.json
 */
async function restorePointCollectionDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.restorePointCollections.delete("rgcompute", "aaaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to the operation to delete the restore point collection. This operation will also delete all the contained restore points.
 *
 * @summary the operation to delete the restore point collection. This operation will also delete all the contained restore points.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_Delete_MinimumSet_Gen.json
 */
async function restorePointCollectionDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.restorePointCollections.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaa");
}

async function main(): Promise<void> {
  await restorePointCollectionDeleteMaximumSetGen();
  await restorePointCollectionDeleteMinimumSetGen();
}

main().catch(console.error);
