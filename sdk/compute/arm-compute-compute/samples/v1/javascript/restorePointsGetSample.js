// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the restore point.
 *
 * @summary the operation to get the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Get.json
 */
async function getARestorePoint() {
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
async function getRestorePointWithInstanceView() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.restorePoints.get("myResourceGroup", "rpcName", "rpName");
  console.log(result);
}

async function main() {
  await getARestorePoint();
  await getRestorePointWithInstanceView();
}

main().catch(console.error);
