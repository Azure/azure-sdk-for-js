// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the disk encryption sets under a subscription.
 *
 * @summary Lists all the disk encryption sets under a subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_ListBySubscription.json
 */
async function listAllDiskEncryptionSetsInASubscription() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskEncryptionSets.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllDiskEncryptionSetsInASubscription();
}

main().catch(console.error);
