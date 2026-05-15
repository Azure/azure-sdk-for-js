// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a VirtualHubRouteTableV2.
 *
 * @summary retrieves the details of a VirtualHubRouteTableV2.
 * x-ms-original-file: 2025-05-01/VirtualHubRouteTableV2Get.json
 */
async function virtualHubVirtualHubRouteTableV2Get() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubRouteTableV2S.get(
    "rg1",
    "virtualHub1",
    "virtualHubRouteTable1a",
  );
  console.log(result);
}

async function main() {
  await virtualHubVirtualHubRouteTableV2Get();
}

main().catch(console.error);
