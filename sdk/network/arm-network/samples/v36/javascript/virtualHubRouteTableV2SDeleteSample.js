// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a VirtualHubRouteTableV2.
 *
 * @summary Deletes a VirtualHubRouteTableV2.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualHubRouteTableV2Delete.json
 */
async function virtualHubRouteTableV2Delete() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const routeTableName = "virtualHubRouteTable1a";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubRouteTableV2S.beginDeleteAndWait(
    resourceGroupName,
    virtualHubName,
    routeTableName,
  );
  console.log(result);
}

async function main() {
  await virtualHubRouteTableV2Delete();
}

main().catch(console.error);
