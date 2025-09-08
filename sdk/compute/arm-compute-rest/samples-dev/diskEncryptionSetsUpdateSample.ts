// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates (patches) a disk encryption set.
 *
 * @summary Updates (patches) a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Update_WithRotationToLatestKeyVersionEnabled.json
 */

import type { DiskEncryptionSetsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueSucceeded(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsUpdateParameters = {
    body: {
      identity: { type: "SystemAssigned" },
      properties: {
        activeKey: {
          keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/keyName/keyVersion1",
        },
        encryptionType: "EncryptionAtRestWithCustomerKey",
        rotationToLatestKeyVersionEnabled: true,
      },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
      subscriptionId,
      resourceGroupName,
      diskEncryptionSetName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueSucceeded().catch(
  console.error,
);
/**
 * This sample demonstrates how to Updates (patches) a disk encryption set.
 *
 * @summary Updates (patches) a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Update_WithRotationToLatestKeyVersionEnabledInProgress.json
 */
async function updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueUpdating(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsUpdateParameters = {
    body: {
      identity: { type: "SystemAssigned" },
      properties: {
        activeKey: {
          keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/keyName/keyVersion1",
        },
        encryptionType: "EncryptionAtRestWithCustomerKey",
        rotationToLatestKeyVersionEnabled: true,
      },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
      subscriptionId,
      resourceGroupName,
      diskEncryptionSetName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueUpdating().catch(
  console.error,
);
/**
 * This sample demonstrates how to Updates (patches) a disk encryption set.
 *
 * @summary Updates (patches) a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Update.json
 */
async function updateADiskEncryptionSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsUpdateParameters = {
    body: {
      properties: {
        activeKey: {
          keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/keyName/keyVersion",
          sourceVault: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myVMVault",
          },
        },
        encryptionType: "EncryptionAtRestWithCustomerKey",
      },
      tags: { department: "Development", project: "Encryption" },
    },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
      subscriptionId,
      resourceGroupName,
      diskEncryptionSetName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateADiskEncryptionSet().catch(console.error);
