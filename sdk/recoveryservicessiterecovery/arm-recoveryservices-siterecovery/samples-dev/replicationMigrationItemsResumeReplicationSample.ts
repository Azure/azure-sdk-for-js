// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to initiate resume replication of the item.
 *
 * @summary the operation to initiate resume replication of the item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_ResumeReplication.json
 */
async function resumeReplication(): Promise<void> {
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

async function main(): Promise<void> {
  await resumeReplication();
}

main().catch(console.error);
