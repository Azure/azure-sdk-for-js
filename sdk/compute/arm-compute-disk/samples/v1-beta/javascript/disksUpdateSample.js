// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_BurstingEnabled.json
 */
async function createOrUpdateABurstingEnabledManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { diskSizeGB: 1024, burstingEnabled: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddAcceleratedNetworking.json
 */
async function updateAManagedDiskToAddAcceleratedNetworking() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportedCapabilities: { acceleratedNetwork: false } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddDiskControllerTypes.json
 */
async function updateAManagedDiskWithDiskControllerTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportedCapabilities: { diskControllerTypes: "SCSI" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddPurchasePlan.json
 */
async function updateAManagedDiskToAddPurchasePlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: {
      purchasePlan: {
        name: "myPurchasePlanName",
        publisher: "myPurchasePlanPublisher",
        product: "myPurchasePlanProduct",
        promotionCode: "myPurchasePlanPromotionCode",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddSupportsHibernation.json
 */
async function updateAManagedDiskToAddSupportsHibernation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportsHibernation: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_ChangeTier.json
 */
async function updateAManagedDiskToChangeTier() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { tier: "P30" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_DisableBursting.json
 */
async function updateAManagedDiskToDisableBursting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { burstingEnabled: false },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_DisableOptimizedForFrequentAttach.json
 */
async function updateAManagedDiskToDisableOptimizedForFrequentAttach() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { optimizedForFrequentAttach: false },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_RemoveDiskAccess.json
 */
async function updateManagedDiskToRemoveDiskAccessResourceAssociation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { networkAccessPolicy: "AllowAll" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_ToAddArchitecture.json
 */
async function updateAManagedDiskToAddArchitecture() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportedCapabilities: { architecture: "Arm64" } },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateABurstingEnabledManagedDisk();
  await updateAManagedDiskToAddAcceleratedNetworking();
  await updateAManagedDiskWithDiskControllerTypes();
  await updateAManagedDiskToAddPurchasePlan();
  await updateAManagedDiskToAddSupportsHibernation();
  await updateAManagedDiskToChangeTier();
  await updateAManagedDiskToDisableBursting();
  await updateAManagedDiskToDisableOptimizedForFrequentAttach();
  await updateManagedDiskToRemoveDiskAccessResourceAssociation();
  await updateAManagedDiskToAddArchitecture();
}

main().catch(console.error);
