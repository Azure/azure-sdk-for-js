// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_CreateOrUpdate_BurstingEnabled.json
 */
async function createOrUpdateABurstingEnabledManagedDisk() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { burstingEnabled: true, diskSizeGB: 1024 };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_AddAcceleratedNetworking.json
 */
async function updateAManagedDiskToAddAcceleratedNetworking() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = {
    supportedCapabilities: { acceleratedNetwork: false },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_ToAddArchitecture.json
 */
async function updateAManagedDiskToAddArchitecture() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { supportedCapabilities: { architecture: "Arm64" } };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_AddPurchasePlan.json
 */
async function updateAManagedDiskToAddPurchasePlan() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = {
    purchasePlan: {
      name: "myPurchasePlanName",
      product: "myPurchasePlanProduct",
      promotionCode: "myPurchasePlanPromotionCode",
      publisher: "myPurchasePlanPublisher",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_AddSupportsHibernation.json
 */
async function updateAManagedDiskToAddSupportsHibernation() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { supportsHibernation: true };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_ChangeTier.json
 */
async function updateAManagedDiskToChangeTier() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { tier: "P30" };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_DisableBursting.json
 */
async function updateAManagedDiskToDisableBursting() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { burstingEnabled: false };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_DisableOptimizedForFrequentAttach.json
 */
async function updateAManagedDiskToDisableOptimizedForFrequentAttach() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { optimizedForFrequentAttach: false };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_AddDiskControllerTypes.json
 */
async function updateAManagedDiskWithDiskControllerTypes() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = {
    supportedCapabilities: { diskControllerTypes: "SCSI" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates (patches) a disk.
 *
 * @summary Updates (patches) a disk.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskExamples/Disk_Update_RemoveDiskAccess.json
 */
async function updateManagedDiskToRemoveDiskAccessResourceAssociation() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskName = "myDisk";
  const disk = { networkAccessPolicy: "AllowAll" };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.disks.beginUpdateAndWait(resourceGroupName, diskName, disk);
  console.log(result);
}

async function main() {
  await createOrUpdateABurstingEnabledManagedDisk();
  await updateAManagedDiskToAddAcceleratedNetworking();
  await updateAManagedDiskToAddArchitecture();
  await updateAManagedDiskToAddPurchasePlan();
  await updateAManagedDiskToAddSupportsHibernation();
  await updateAManagedDiskToChangeTier();
  await updateAManagedDiskToDisableBursting();
  await updateAManagedDiskToDisableOptimizedForFrequentAttach();
  await updateAManagedDiskWithDiskControllerTypes();
  await updateManagedDiskToRemoveDiskAccessResourceAssociation();
}

main().catch(console.error);
