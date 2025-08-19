// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all resources that are encrypted with this disk encryption set.
 *
 * @summary Lists all resources that are encrypted with this disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_ListAssociatedResources.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllResourcesThatAreEncryptedWithThisDiskEncryptionSet(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskEncryptionSets.listAssociatedResources(
    resourceGroupName,
    diskEncryptionSetName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllResourcesThatAreEncryptedWithThisDiskEncryptionSet();
}

main().catch(console.error);
