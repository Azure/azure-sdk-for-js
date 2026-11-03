// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to initiate resume replication of the item.
 *
 * @summary the operation to initiate resume replication of the item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_ResumeReplication.json
 */
async function resumeReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationMigrationItems.resumeReplication(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
    {
      properties: {
        providerSpecificDetails: { deleteMigrationResources: "false", instanceType: "VMwareCbt" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await resumeReplication();
}

main().catch(console.error);
