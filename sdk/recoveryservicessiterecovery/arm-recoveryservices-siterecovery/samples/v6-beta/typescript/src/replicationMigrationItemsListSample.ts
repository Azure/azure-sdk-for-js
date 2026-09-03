// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of migration items in the vault.
 *
 * @summary gets the list of migration items in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_List.json
 */
async function getsTheListOfMigrationItemsInTheVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationMigrationItems.list(
    "resourcegroup1",
    "migrationvault",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfMigrationItemsInTheVault();
}

main().catch(console.error);
