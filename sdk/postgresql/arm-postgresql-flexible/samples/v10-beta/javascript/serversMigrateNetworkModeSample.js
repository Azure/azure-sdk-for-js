// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrates the network configuration of a PostgreSQL flexible server from customer owned VNET to Microsoft owned VNET with support for private endpoints, or from Microsoft owned VNET with no support for private endpoints to Microsoft owned VNET with support for private endpoints.
 *
 * @summary migrates the network configuration of a PostgreSQL flexible server from customer owned VNET to Microsoft owned VNET with support for private endpoints, or from Microsoft owned VNET with no support for private endpoints to Microsoft owned VNET with support for private endpoints.
 * x-ms-original-file: 2026-01-01-preview/ServersMigrateNetworkMode.json
 */
async function migrateServerNetworkConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.migrateNetworkMode("exampleresourcegroup", "exampleserver");
  console.log(result);
}

async function main() {
  await migrateServerNetworkConfiguration();
}

main().catch(console.error);
