// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_BurstingEnabled.json
 */
async function createOrUpdateABurstingEnabledManagedDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { diskSizeGB: 1024, burstingEnabled: true },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddAcceleratedNetworking.json
 */
async function updateAManagedDiskToAddAcceleratedNetworking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportedCapabilities: { acceleratedNetwork: false } },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddDiskControllerTypes.json
 */
async function updateAManagedDiskWithDiskControllerTypes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportedCapabilities: { diskControllerTypes: "SCSI" } },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddPurchasePlan.json
 */
async function updateAManagedDiskToAddPurchasePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: {
      purchasePlan: {
        name: "myPurchasePlanName",
        publisher: "myPurchasePlanPublisher",
        product: "myPurchasePlanProduct",
        promotionCode: "myPurchasePlanPromotionCode",
      },
    },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_AddSupportsHibernation.json
 */
async function updateAManagedDiskToAddSupportsHibernation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportsHibernation: true },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_ChangeTier.json
 */
async function updateAManagedDiskToChangeTier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { tier: "P30" },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_DisableBursting.json
 */
async function updateAManagedDiskToDisableBursting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { burstingEnabled: false },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_DisableOptimizedForFrequentAttach.json
 */
async function updateAManagedDiskToDisableOptimizedForFrequentAttach(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { optimizedForFrequentAttach: false },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_RemoveDiskAccess.json
 */
async function updateManagedDiskToRemoveDiskAccessResourceAssociation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { networkAccessPolicy: "AllowAll" },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk.
 *
 * @summary updates (patches) a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Update_ToAddArchitecture.json
 */
async function updateAManagedDiskToAddArchitecture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.disks.update("myResourceGroup", "myDisk", {
    properties: { supportedCapabilities: { architecture: "Arm64" } },
  });
}

async function main(): Promise<void> {
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
