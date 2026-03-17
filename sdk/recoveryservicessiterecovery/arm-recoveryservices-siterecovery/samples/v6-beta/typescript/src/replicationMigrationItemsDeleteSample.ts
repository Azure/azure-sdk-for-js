// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete an ASR migration item.
 *
 * @summary the operation to delete an ASR migration item.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_Delete.json
 */
async function deleteTheMigrationItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationMigrationItems.delete(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
  );
}

async function main(): Promise<void> {
  await deleteTheMigrationItem();
}

main().catch(console.error);
