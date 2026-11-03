// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a migration item.
 *
 * @summary gets the details of a migration item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_Get.json
 */
async function getsTheDetailsOfAMigrationItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationMigrationItems.get(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
  );
  console.log(result);
}

async function main() {
  await getsTheDetailsOfAMigrationItem();
}

main().catch(console.error);
