// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the disk encryption sets under a subscription.
 *
 * @summary Lists all the disk encryption sets under a subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2019-07-01/examples/ListDiskEncryptionSetsInASubscription.json
 */

import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllDiskEncryptionSetsInASubscription(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskEncryptionSets.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllDiskEncryptionSetsInASubscription();
}

main().catch(console.error);
