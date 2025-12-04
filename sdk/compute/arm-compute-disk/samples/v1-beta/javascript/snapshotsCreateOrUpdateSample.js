// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromADifferentSubscription.json
 */
async function createASnapshotByImportingAnUnmanagedBlobFromADifferentSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot1", {
    location: "West US",
    creationData: {
      createOption: "Import",
      storageAccountId:
        "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
      sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromTheSameSubscription.json
 */
async function createASnapshotByImportingAnUnmanagedBlobFromTheSameSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot1", {
    location: "West US",
    creationData: {
      createOption: "Import",
      sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_EnhancedProvisionedBandwidthCopySpeed.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegionWithQuickerCopySpeed() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    creationData: {
      createOption: "CopyStart",
      sourceResourceId:
        "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
      provisionedBandwidthCopySpeed: "Enhanced",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_FromAnElasticSanVolumeSnapshot.json
 */
async function createASnapshotFromAnElasticSanVolumeSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot", {
    location: "West US",
    creationData: {
      createOption: "CopyFromSanSnapshot",
      elasticSanResourceId:
        "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.ElasticSan/elasticSans/myElasticSan/volumegroups/myElasticSanVolumeGroup/snapshots/myElasticSanVolumeSnapshot",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_FromAnExistingSnapshot.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    creationData: {
      createOption: "Copy",
      sourceResourceId:
        "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_FromAnExistingSnapshotInDifferentRegion.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    creationData: {
      createOption: "CopyStart",
      sourceResourceId:
        "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_InstantAccessSnapshot.json
 */
async function createASnapshotWhichCanBeInstantlyAccessable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    creationData: {
      createOption: "Copy",
      sourceResourceId:
        "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myDisk1",
      instantAccessDurationMinutes: 120,
    },
  });
  console.log(result);
}

async function main() {
  await createASnapshotByImportingAnUnmanagedBlobFromADifferentSubscription();
  await createASnapshotByImportingAnUnmanagedBlobFromTheSameSubscription();
  await createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegionWithQuickerCopySpeed();
  await createASnapshotFromAnElasticSanVolumeSnapshot();
  await createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscription();
  await createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegion();
  await createASnapshotWhichCanBeInstantlyAccessable();
}

main().catch(console.error);
