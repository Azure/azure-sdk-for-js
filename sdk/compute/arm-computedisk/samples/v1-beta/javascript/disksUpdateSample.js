// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computedisk");
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
  await client.disks.update("myResourceGroup", "myDisk", {
    diskSizeGB: 1024,
    burstingEnabled: true,
  });
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
  await client.disks.update("myResourceGroup", "myDisk", {
    supportedCapabilities: { acceleratedNetwork: false },
  });
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
  await client.disks.update("myResourceGroup", "myDisk", {
    supportedCapabilities: { diskControllerTypes: "SCSI" },
  });
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
  await client.disks.update("myResourceGroup", "myDisk", {
    purchasePlan: {
      name: "myPurchasePlanName",
      publisher: "myPurchasePlanPublisher",
      product: "myPurchasePlanProduct",
      promotionCode: "myPurchasePlanPromotionCode",
    },
  });
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
  await client.disks.update("myResourceGroup", "myDisk", { supportsHibernation: true });
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
  await client.disks.update("myResourceGroup", "myDisk", { tier: "P30" });
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
  await client.disks.update("myResourceGroup", "myDisk", { burstingEnabled: false });
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
  await client.disks.update("myResourceGroup", "myDisk", { optimizedForFrequentAttach: false });
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
  await client.disks.update("myResourceGroup", "myDisk", { networkAccessPolicy: "AllowAll" });
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
  await client.disks.update("myResourceGroup", "myDisk", {
    supportedCapabilities: { architecture: "Arm64" },
  });
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
