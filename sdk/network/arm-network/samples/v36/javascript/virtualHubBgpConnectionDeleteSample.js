// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a VirtualHubBgpConnection.
 *
 * @summary Deletes a VirtualHubBgpConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualHubBgpConnectionDelete.json
 */
async function virtualHubRouteTableV2Delete() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "hub1";
  const connectionName = "conn1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubBgpConnection.beginDeleteAndWait(
    resourceGroupName,
    virtualHubName,
    connectionName,
  );
  console.log(result);
}

async function main() {
  await virtualHubRouteTableV2Delete();
}

main().catch(console.error);
