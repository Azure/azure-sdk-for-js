// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to initiate test migrate cleanup.
 *
 * @summary the operation to initiate test migrate cleanup.
 * x-ms-original-file: 2025-08-01/ReplicationMigrationItems_TestMigrateCleanup.json
 */
async function testMigrateCleanup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationMigrationItems.testMigrateCleanup(
    "resourcegroup1",
    "migrationvault",
    "vmwarefabric1",
    "vmwareContainer1",
    "virtualmachine1",
    { properties: { comments: "Test Failover Cleanup" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await testMigrateCleanup();
}

main().catch(console.error);
