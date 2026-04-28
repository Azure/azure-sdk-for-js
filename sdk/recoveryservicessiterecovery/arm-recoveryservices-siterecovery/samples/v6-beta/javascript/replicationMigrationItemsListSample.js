// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of migration items in the vault.
 *
 * @summary gets the list of migration items in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_List.json
 */
async function getsTheListOfMigrationItemsInTheVault() {
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

async function main() {
  await getsTheListOfMigrationItemsInTheVault();
}

main().catch(console.error);
