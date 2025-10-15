// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to grants access to a diskRestorePoint.
 *
 * @summary grants access to a diskRestorePoint.
 * x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_BeginGetAccess.json
 */
async function grantsAccessToADiskRestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskRestorePoints.grantAccess(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745",
    { access: "Read", durationInSeconds: 300, fileFormat: "VHDX" },
  );
  console.log(result);
}

async function main() {
  await grantsAccessToADiskRestorePoint();
}

main().catch(console.error);
