// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified External Cache Connection
 *
 * @summary delete the specified External Cache Connection
 * x-ms-original-file: 2026-08-15-preview/ExternalCacheConnections_Delete.json
 */
async function externalCacheConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.externalCacheConnections.delete("contosoNetAppRg", "contosoCacheConnection");
}

async function main() {
  await externalCacheConnectionsDelete();
}

main().catch(console.error);
