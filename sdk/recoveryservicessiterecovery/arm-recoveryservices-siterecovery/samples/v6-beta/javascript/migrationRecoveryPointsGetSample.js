// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a recovery point for a migration item.
 *
 * @summary gets a recovery point for a migration item.
 * x-ms-original-file: 2025-08-01/MigrationRecoveryPoints_Get.json
 */
async function getsARecoveryPointForAMigrationItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.migrationRecoveryPoints.get(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
    "b22134ea-620c-474b-9fa5-3c1cb47708e3",
  );
  console.log(result);
}

async function main() {
  await getsARecoveryPointForAMigrationItem();
}

main().catch(console.error);
