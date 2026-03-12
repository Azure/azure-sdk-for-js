// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to initiate pause replication of the item.
 *
 * @summary the operation to initiate pause replication of the item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_PauseReplication.json
 */
async function pauseReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationMigrationItems.pauseReplication(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
    { properties: { instanceType: "VMwareCbt" } },
  );
  console.log(result);
}

async function main() {
  await pauseReplication();
}

main().catch(console.error);
