// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to revokes access to a diskRestorePoint.
 *
 * @summary revokes access to a diskRestorePoint.
 * x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_EndGetAccess.json
 */
async function revokesAccessToADiskRestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskRestorePoints.revokeAccess(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745",
  );
  console.log(result);
}

async function main() {
  await revokesAccessToADiskRestorePoint();
}

main().catch(console.error);
