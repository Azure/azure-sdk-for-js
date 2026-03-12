// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a snapshot.
 *
 * @summary Creates or updates a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromADifferentSubscription.json
 */

import type { SnapshotsCreateOrUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createASnapshotByImportingAnUnmanagedBlobFromADifferentSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot1";
  const options: SnapshotsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        creationData: {
          createOption: "Import",
          sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
          storageAccountId:
            "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
        },
      },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createASnapshotByImportingAnUnmanagedBlobFromADifferentSubscription().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a snapshot.
 *
 * @summary Creates or updates a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromTheSameSubscription.json
 */
async function createASnapshotByImportingAnUnmanagedBlobFromTheSameSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot1";
  const options: SnapshotsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        creationData: {
          createOption: "Import",
          sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
        },
      },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createASnapshotByImportingAnUnmanagedBlobFromTheSameSubscription().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a snapshot.
 *
 * @summary Creates or updates a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Create_FromAnExistingSnapshotInDifferentRegion.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot2";
  const options: SnapshotsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        creationData: {
          createOption: "CopyStart",
          sourceResourceId:
            "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
        },
      },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscriptionInADifferentRegion().catch(
  console.error,
);
/**
 * This sample demonstrates how to Creates or updates a snapshot.
 *
 * @summary Creates or updates a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Create_FromAnExistingSnapshot.json
 */
async function createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot2";
  const options: SnapshotsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        creationData: {
          createOption: "Copy",
          sourceResourceId:
            "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot1",
        },
      },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createASnapshotFromAnExistingSnapshotInTheSameOrADifferentSubscription().catch(console.error);
