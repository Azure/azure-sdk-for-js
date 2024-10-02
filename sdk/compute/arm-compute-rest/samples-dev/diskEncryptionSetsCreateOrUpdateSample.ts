// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DiskEncryptionSetsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a disk encryption set
 *
 * @summary Creates or updates a disk encryption set
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Create_WithKeyVaultFromADifferentSubscription.json
 */
async function createADiskEncryptionSetWithKeyVaultFromADifferentSubscription() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsCreateOrUpdateParameters = {
    body: {
      identity: { type: "SystemAssigned" },
      location: "West US",
      properties: {
        activeKey: {
          keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/{key}",
        },
        encryptionType: "EncryptionAtRestWithCustomerKey",
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
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createADiskEncryptionSetWithKeyVaultFromADifferentSubscription().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a disk encryption set
 *
 * @summary Creates or updates a disk encryption set
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Create_WithKeyVaultFromADifferentTenant.json
 */
async function createADiskEncryptionSetWithKeyVaultFromADifferentTenant() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsCreateOrUpdateParameters = {
    body: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}":
            {},
        },
      },
      location: "West US",
      properties: {
        activeKey: {
          keyUrl: "https://myvaultdifferenttenant.vault-int.azure-int.net/keys/{key}",
        },
        encryptionType: "EncryptionAtRestWithCustomerKey",
        federatedClientId: "00000000-0000-0000-0000-000000000000",
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
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createADiskEncryptionSetWithKeyVaultFromADifferentTenant().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a disk encryption set
 *
 * @summary Creates or updates a disk encryption set
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Create.json
 */
async function createADiskEncryptionSet() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsCreateOrUpdateParameters = {
    body: {
      identity: { type: "SystemAssigned" },
      location: "West US",
      properties: {
        activeKey: {
          keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/{key}",
          sourceVault: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myVMVault",
          },
        },
        encryptionType: "EncryptionAtRestWithCustomerKey",
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
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createADiskEncryptionSet().catch(console.error);
