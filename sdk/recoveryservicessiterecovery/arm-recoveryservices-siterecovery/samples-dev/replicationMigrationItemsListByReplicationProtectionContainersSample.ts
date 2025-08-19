// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of ASR migration items in the protection container.
 *
 * @summary Gets the list of ASR migration items in the protection container.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationMigrationItems_ListByReplicationProtectionContainers.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheListOfMigrationItemsInTheProtectionContainer(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourcegroup1";
  const resourceName = "migrationvault";
  const fabricName = "vmwarefabric1";
  const protectionContainerName = "vmwareContainer1";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationMigrationItems.listByReplicationProtectionContainers(
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfMigrationItemsInTheProtectionContainer();
}

main().catch(console.error);
