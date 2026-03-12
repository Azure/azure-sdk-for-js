// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to initiate test migrate cleanup.
 *
 * @summary The operation to initiate test migrate cleanup.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationMigrationItems_TestMigrateCleanup.json
 */

import {
  TestMigrateCleanupInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function testMigrateCleanup(): Promise<void> {
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
  const testMigrateCleanupInput: TestMigrateCleanupInput = {
    properties: { comments: "Test Failover Cleanup" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationMigrationItems.beginTestMigrateCleanupAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      migrationItemName,
      testMigrateCleanupInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await testMigrateCleanup();
}

main().catch(console.error);
