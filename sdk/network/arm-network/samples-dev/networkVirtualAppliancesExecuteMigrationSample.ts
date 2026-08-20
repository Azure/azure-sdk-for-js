// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to executes the migration of the specified Network Virtual Appliance. This step performs the migration workflow that was previously prepared.
 *
 * @summary executes the migration of the specified Network Virtual Appliance. This step performs the migration workflow that was previously prepared.
 * x-ms-original-file: 2025-09-01/NetworkVirtualApplianceExecuteMigration.json
 */
async function executeMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualAppliances.executeMigration("rg1", "nva", {
    properties: { migrationType: "MigrateToNewILBArchitecture" },
  });
}

async function main(): Promise<void> {
  await executeMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture();
}

main().catch(console.error);
