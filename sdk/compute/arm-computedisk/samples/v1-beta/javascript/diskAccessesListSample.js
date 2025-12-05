// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-computedisk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the disk access resources under a subscription.
 *
 * @summary lists all the disk access resources under a subscription.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListBySubscription.json
 */
async function listAllDiskAccessResourcesInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskAccesses.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllDiskAccessResourcesInASubscription();
}

main().catch(console.error);
