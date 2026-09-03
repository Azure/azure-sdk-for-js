// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 *
 * @summary the Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 * x-ms-original-file: 2026-04-01/FileSharesLease_Acquire.json
 */
async function acquireALeaseOnAShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.lease("res3376", "sto328", "share124", {
    parameters: { action: "Acquire", leaseDuration: -1 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 *
 * @summary the Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 * x-ms-original-file: 2026-04-01/FileSharesLease_Break.json
 */
async function breakALeaseOnAShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.lease("res3376", "sto328", "share12", {
    parameters: { action: "Break", leaseId: "8698f513-fa75-44a1-b8eb-30ba336af27d" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await acquireALeaseOnAShare();
  await breakALeaseOnAShare();
}

main().catch(console.error);
