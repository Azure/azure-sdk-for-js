// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromADifferentSubscription.json
 */
async function createASnapshotByImportingAnUnmanagedBlobFromADifferentSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot1", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Import",
        storageAccountId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
        sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
      },
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromTheSameSubscription.json
 */
async function createASnapshotByImportingAnUnmanagedBlobFromTheSameSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot1", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Import",
        sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
      },
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_EnhancedProvisionedBandwidthCopySpeed.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegionWithQuickerCopySpeed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "CopyStart",
        sourceResourceId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
        provisionedBandwidthCopySpeed: "Enhanced",
      },
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_FromAnElasticSanVolumeSnapshot.json
 */
async function createASnapshotFromAnElasticSanVolumeSnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "CopyFromSanSnapshot",
        elasticSanResourceId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.ElasticSan/elasticSans/myElasticSan/volumegroups/myElasticSanVolumeGroup/snapshots/myElasticSanVolumeSnapshot",
      },
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_FromAnExistingSnapshot.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Copy",
        sourceResourceId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
      },
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_FromAnExistingSnapshotInDifferentRegion.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "CopyStart",
        sourceResourceId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
      },
    },
  });
}

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_InstantAccessSnapshot.json
 */
async function createASnapshotWhichCanBeInstantlyAccessable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.snapshots.createOrUpdate("myResourceGroup", "mySnapshot2", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Copy",
        sourceResourceId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myDisk1",
        instantAccessDurationMinutes: 120,
      },
    },
  });
}

async function main(): Promise<void> {
  await createASnapshotByImportingAnUnmanagedBlobFromADifferentSubscription();
  await createASnapshotByImportingAnUnmanagedBlobFromTheSameSubscription();
  await createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegionWithQuickerCopySpeed();
  await createASnapshotFromAnElasticSanVolumeSnapshot();
  await createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscription();
  await createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegion();
  await createASnapshotWhichCanBeInstantlyAccessable();
}

main().catch(console.error);
