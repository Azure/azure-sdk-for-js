// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the disk access resources under a subscription.
 *
 * @summary Lists all the disk access resources under a subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskAccessExamples/DiskAccess_ListBySubscription.json
 */
async function listAllDiskAccessResourcesInASubscription() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
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
