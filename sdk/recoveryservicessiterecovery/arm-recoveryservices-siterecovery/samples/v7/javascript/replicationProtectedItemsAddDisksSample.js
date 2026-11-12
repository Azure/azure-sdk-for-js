// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to add disks(s) to the replication protected item.
 *
 * @summary operation to add disks(s) to the replication protected item.
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_AddDisks.json
 */
async function addsAConfidentialDataDiskToAnA2AProtectedConfidentialVM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.addDisks(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    {
      properties: {
        providerSpecificDetails: {
          instanceType: "A2A",
          vmManagedDisks: [
            {
              diskId:
                "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourcegroups/primaryResource/providers/Microsoft.Compute/disks/datadisk2",
              primaryStagingAzureStorageAccountId:
                "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourcegroups/primaryResource/providers/Microsoft.Storage/storageAccounts/vmcachestorage",
              recoveryResourceGroupId:
                "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourcegroups/recoveryResource",
              recoveryNetworkAccessPolicy: "AllowPrivate",
              recoveryDiskAccessId:
                "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourcegroups/recoveryResource/providers/Microsoft.Compute/diskAccesses/recoveryDiskAccess",
              recoveryPublicNetworkAccess: "Disabled",
              confidentialDiskEncryptionInfo: {
                recoveryReplicaConfidentialDiskEncryptionSetId:
                  "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourcegroups/recoveryResource/providers/Microsoft.Compute/diskEncryptionSets/cvm-replica-des",
                recoveryTargetConfidentialDiskEncryptionSetId:
                  "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourcegroups/recoveryResource/providers/Microsoft.Compute/diskEncryptionSets/cvm-target-des",
              },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await addsAConfidentialDataDiskToAnA2AProtectedConfidentialVM();
}

main().catch(console.error);
