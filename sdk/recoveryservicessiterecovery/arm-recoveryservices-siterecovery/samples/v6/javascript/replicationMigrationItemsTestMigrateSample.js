// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to initiate test migration of the item.
 *
 * @summary the operation to initiate test migration of the item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_TestMigrate.json
 */
async function testMigrateItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationMigrationItems.testMigrate(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
    {
      properties: {
        providerSpecificDetails: {
          instanceType: "VMwareCbt",
          networkId:
            "/Subscriptions/cb53d0c3-bd59-4721-89bc-06916a9147ef/resourceGroups/resourcegroup1/providers/Microsoft.Network/virtualNetworks/virtualNetwork1",
          osUpgradeVersion: "Microsoft Windows Server 2019 (64-bit)",
          recoveryPointId:
            "/Subscriptions/cb53d0c3-bd59-4721-89bc-06916a9147ef/resourceGroups/resourcegroup1/providers/Microsoft.RecoveryServices/vaults/migrationvault/replicationFabrics/vmwarefabric1/replicationProtectionContainers/vmwareContainer1/replicationMigrationItems/virtualmachine1/migrationRecoveryPoints/9e737191-317e-43d0-8c83-e32ac3b34686",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await testMigrateItem();
}

main().catch(console.error);
