// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a HubVirtualNetworkConnection.
 *
 * @summary retrieves the details of a HubVirtualNetworkConnection.
 * x-ms-original-file: 2025-05-01/HubVirtualNetworkConnectionGet.json
 */
async function hubVirtualNetworkConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubVirtualNetworkConnections.get("rg1", "virtualHub1", "connection1");
  console.log(result);
}

async function main() {
  await hubVirtualNetworkConnectionGet();
}

main().catch(console.error);
