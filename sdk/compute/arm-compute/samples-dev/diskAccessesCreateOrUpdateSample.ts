// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a disk access resource
 *
 * @summary Creates or updates a disk access resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskAccessExamples/DiskAccess_Create.json
 */

import { DiskAccess, ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createADiskAccessResource(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const diskAccess: DiskAccess = { location: "West US" };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskAccesses.beginCreateOrUpdateAndWait(
    resourceGroupName,
    diskAccessName,
    diskAccess,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createADiskAccessResource();
}

main().catch(console.error);
