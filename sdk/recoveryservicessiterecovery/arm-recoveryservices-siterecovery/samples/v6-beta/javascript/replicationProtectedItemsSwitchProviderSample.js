// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to initiate a switch provider of the replication protected item.
 *
 * @summary operation to initiate a switch provider of the replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_SwitchProvider.json
 */
async function executeSwitchProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.switchProvider(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    {
      properties: {
        providerSpecificDetails: {
          instanceType: "InMageAzureV2",
          targetApplianceID: "5efaa202-e958-435e-8171-706bf735fcc4",
          targetFabricID:
            "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud2",
          targetVaultID:
            "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault2",
        },
        targetInstanceType: "InMageRcm",
      },
    },
  );
  console.log(result);
}

async function main() {
  await executeSwitchProvider();
}

main().catch(console.error);
