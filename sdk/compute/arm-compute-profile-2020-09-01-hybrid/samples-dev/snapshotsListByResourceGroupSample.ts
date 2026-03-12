// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists snapshots under a resource group.
 *
 * @summary Lists snapshots under a resource group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2019-07-01/examples/ListSnapshotsInAResourceGroup.json
 */

import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllSnapshotsInAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.snapshots.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllSnapshotsInAResourceGroup();
}

main().catch(console.error);
