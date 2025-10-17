// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete the restore point.
 *
 * @summary the operation to delete the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Delete_MaximumSet_Gen.json
 */
async function restorePointDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.restorePoints.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaa", "a");
}

/**
 * This sample demonstrates how to the operation to delete the restore point.
 *
 * @summary the operation to delete the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Delete_MinimumSet_Gen.json
 */
async function restorePointDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.restorePoints.delete("rgcompute", "aaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaa");
}

async function main() {
  await restorePointDeleteMaximumSetGen();
  await restorePointDeleteMinimumSetGen();
}

main().catch(console.error);
