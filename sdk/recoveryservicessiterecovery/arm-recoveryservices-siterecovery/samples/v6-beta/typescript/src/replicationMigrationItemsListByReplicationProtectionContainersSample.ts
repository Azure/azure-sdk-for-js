// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of ASR migration items in the protection container.
 *
 * @summary gets the list of ASR migration items in the protection container.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_ListByReplicationProtectionContainers.json
 */
async function getsTheListOfMigrationItemsInTheProtectionContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationMigrationItems.listByReplicationProtectionContainers(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfMigrationItemsInTheProtectionContainer();
}

main().catch(console.error);
