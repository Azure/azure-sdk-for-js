// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to commits the migration of the specified Network Virtual Appliance. This finalizes a previously executed migration workflow.
 *
 * @summary commits the migration of the specified Network Virtual Appliance. This finalizes a previously executed migration workflow.
 * x-ms-original-file: 2025-09-01/NetworkVirtualApplianceCommitMigration.json
 */
async function commitMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualAppliances.commitMigration("rg1", "nva", {
    properties: { migrationType: "MigrateToNewILBArchitecture" },
  });
}

async function main(): Promise<void> {
  await commitMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture();
}

main().catch(console.error);
