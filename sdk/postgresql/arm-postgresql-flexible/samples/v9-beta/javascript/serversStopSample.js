// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a server.
 *
 * @summary stops a server.
 * x-ms-original-file: 2026-01-01-preview/ServersStop.json
 */
async function stopAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.stop("exampleresourcegroup", "exampleserver");
}

async function main() {
  await stopAServer();
}

main().catch(console.error);
