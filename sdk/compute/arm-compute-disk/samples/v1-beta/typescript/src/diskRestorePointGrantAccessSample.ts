// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to grants access to a diskRestorePoint.
 *
 * @summary grants access to a diskRestorePoint.
 * x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_BeginGetAccess.json
 */
async function grantsAccessToADiskRestorePoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskRestorePoint.grantAccess(
    "myResourceGroup",
    "rpc",
    "vmrp",
    "TestDisk45ceb03433006d1baee0_b70cd924-3362-4a80-93c2-9415eaa12745",
    { access: "Read", durationInSeconds: 300, fileFormat: "VHDX" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await grantsAccessToADiskRestorePoint();
}

main().catch(console.error);
