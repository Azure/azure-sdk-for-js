// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the recovery points for a migration item.
 *
 * @summary gets the recovery points for a migration item.
 * x-ms-original-file: 2025-08-01/MigrationRecoveryPoints_ListByReplicationMigrationItems.json
 */
async function getsTheRecoveryPointsForAMigrationItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrationRecoveryPoints.listByReplicationMigrationItems(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheRecoveryPointsForAMigrationItem();
}

main().catch(console.error);
