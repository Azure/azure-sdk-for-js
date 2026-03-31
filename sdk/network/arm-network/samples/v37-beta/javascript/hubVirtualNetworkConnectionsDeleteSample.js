// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a HubVirtualNetworkConnection.
 *
 * @summary deletes a HubVirtualNetworkConnection.
 * x-ms-original-file: 2025-05-01/HubVirtualNetworkConnectionDelete.json
 */
async function hubVirtualNetworkConnectionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.hubVirtualNetworkConnections.delete("rg1", "virtualHub1", "connection1");
}

async function main() {
  await hubVirtualNetworkConnectionDelete();
}

main().catch(console.error);
