// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to resynchronize replication of an ASR migration item.
 *
 * @summary the operation to resynchronize replication of an ASR migration item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_Resync.json
 */
async function resynchronizesReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationMigrationItems.resync(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
    {
      properties: { providerSpecificDetails: { instanceType: "VMwareCbt", skipCbtReset: "true" } },
    },
  );
  console.log(result);
}

async function main() {
  await resynchronizesReplication();
}

main().catch(console.error);
