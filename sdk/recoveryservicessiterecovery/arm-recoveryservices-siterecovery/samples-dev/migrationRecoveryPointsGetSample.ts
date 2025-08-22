// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a recovery point for a migration item.
 *
 * @summary Gets a recovery point for a migration item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/MigrationRecoveryPoints_Get.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsARecoveryPointForAMigrationItem(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourcegroup1";
  const resourceName = "migrationvault";
  const fabricName = "vmwarefabric1";
  const protectionContainerName = "vmwareContainer1";
  const migrationItemName = "virtualmachine1";
  const migrationRecoveryPointName = "b22134ea-620c-474b-9fa5-3c1cb47708e3";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.migrationRecoveryPoints.get(
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    migrationItemName,
    migrationRecoveryPointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsARecoveryPointForAMigrationItem();
}

main().catch(console.error);
