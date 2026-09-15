// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aborts an in-progress migration of the specified Network Virtual Appliance and rolls back to the previous state.
 *
 * @summary aborts an in-progress migration of the specified Network Virtual Appliance and rolls back to the previous state.
 * x-ms-original-file: 2025-09-01/NetworkVirtualApplianceAbortMigration.json
 */
async function abortMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualAppliances.abortMigration("rg1", "nva");
}

async function main() {
  await abortMigrationOfANetworkVirtualApplianceToTheNewILBArchitecture();
}

main().catch(console.error);
