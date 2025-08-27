// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Grants access to a disk.
 *
 * @summary Grants access to a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_BeginGetAccess.json
 */

import { GrantAccessData, ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getASasOnAManagedDisk(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const grantAccessData: GrantAccessData = {
    access: "Read",
    durationInSeconds: 300,
    fileFormat: "VHD",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginGrantAccessAndWait(
    resourceGroupName,
    diskName,
    grantAccessData,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Grants access to a disk.
 *
 * @summary Grants access to a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_BeginGetAccess_WithVMGuestState.json
 */
async function getSasOnManagedDiskAndVMGuestState(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const grantAccessData: GrantAccessData = {
    access: "Read",
    durationInSeconds: 300,
    getSecureVMGuestStateSAS: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginGrantAccessAndWait(
    resourceGroupName,
    diskName,
    grantAccessData,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Grants access to a disk.
 *
 * @summary Grants access to a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_BeginGetAccess_WithVMGuestStateAndVMMetadata.json
 */
async function getSasOnManagedDiskVMGuestStateAndVMMetadataForConfidentialVM(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const grantAccessData: GrantAccessData = {
    access: "Read",
    durationInSeconds: 300,
    getSecureVMGuestStateSAS: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginGrantAccessAndWait(
    resourceGroupName,
    diskName,
    grantAccessData,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASasOnAManagedDisk();
  await getSasOnManagedDiskAndVMGuestState();
  await getSasOnManagedDiskVMGuestStateAndVMMetadataForConfidentialVM();
}

main().catch(console.error);
