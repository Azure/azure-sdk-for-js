// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 *
 * @summary the Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 * x-ms-original-file: 2026-04-01/BlobContainersLease_Acquire.json
 */
async function acquireALeaseOnAContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.lease("res3376", "sto328", "container6185", {
    parameters: { action: "Acquire", leaseDuration: -1 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 *
 * @summary the Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 * x-ms-original-file: 2026-04-01/BlobContainersLease_Break.json
 */
async function breakALeaseOnAContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.lease("res3376", "sto328", "container6185", {
    parameters: { action: "Break", leaseId: "8698f513-fa75-44a1-b8eb-30ba336af27d" },
  });
  console.log(result);
}

async function main() {
  await acquireALeaseOnAContainer();
  await breakALeaseOnAContainer();
}

main().catch(console.error);
