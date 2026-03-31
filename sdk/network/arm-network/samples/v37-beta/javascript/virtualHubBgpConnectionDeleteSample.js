// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a VirtualHubBgpConnection.
 *
 * @summary deletes a VirtualHubBgpConnection.
 * x-ms-original-file: 2025-05-01/VirtualHubBgpConnectionDelete.json
 */
async function virtualHubRouteTableV2Delete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualHubBgpConnection.delete("rg1", "hub1", "conn1");
}

async function main() {
  await virtualHubRouteTableV2Delete();
}

main().catch(console.error);
