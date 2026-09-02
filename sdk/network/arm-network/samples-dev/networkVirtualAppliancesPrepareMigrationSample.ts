// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to prepares the migration of the specified Network Virtual Appliance. This is the first step of a migration workflow, such as migrating to a new OS version or to the new internal load balancer architecture.
 *
 * @summary prepares the migration of the specified Network Virtual Appliance. This is the first step of a migration workflow, such as migrating to a new OS version or to the new internal load balancer architecture.
 * x-ms-original-file: 2025-09-01/NetworkVirtualAppliancePrepareMigration.json
 */
async function prepareMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualAppliances.prepareMigration("rg1", "nva", {
    properties: { migrationType: "MigrateToNewILBArchitecture" },
  });
}

async function main(): Promise<void> {
  await prepareMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture();
}

main().catch(console.error);
