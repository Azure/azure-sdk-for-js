// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a VirtualHubRouteTableV2.
 *
 * @summary deletes a VirtualHubRouteTableV2.
 * x-ms-original-file: 2025-05-01/VirtualHubRouteTableV2Delete.json
 */
async function virtualHubRouteTableV2Delete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualHubRouteTableV2S.delete("rg1", "virtualHub1", "virtualHubRouteTable1a");
}

async function main() {
  await virtualHubRouteTableV2Delete();
}

main().catch(console.error);
