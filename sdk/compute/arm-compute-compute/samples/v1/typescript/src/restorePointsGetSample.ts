// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the restore point.
 *
 * @summary the operation to get the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Get.json
 */
async function getARestorePoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePoints.get("myResourceGroup", "rpcName", "rpName");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the restore point.
 *
 * @summary the operation to get the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Get_WithInstanceView.json
 */
async function getRestorePointWithInstanceView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePoints.get("myResourceGroup", "rpcName", "rpName");
  console.log(result);
}

async function main(): Promise<void> {
  await getARestorePoint();
  await getRestorePointWithInstanceView();
}

main().catch(console.error);
