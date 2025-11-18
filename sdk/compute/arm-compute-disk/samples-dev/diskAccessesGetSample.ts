// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a disk access resource.
 *
 * @summary gets information about a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Get.json
 */
async function getInformationAboutADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskAccesses.get("myResourceGroup", "myDiskAccess");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a disk access resource.
 *
 * @summary gets information about a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Get_WithPrivateEndpoints.json
 */
async function getInformationAboutADiskAccessResourceWithPrivateEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskAccesses.get("myResourceGroup", "myDiskAccess");
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutADiskAccessResource();
  await getInformationAboutADiskAccessResourceWithPrivateEndpoints();
}

main().catch(console.error);
