// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified nat gateway.
 *
 * @summary Deletes the specified nat gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatGatewayDelete.json
 */
async function deleteNatGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const natGatewayName = "test-natGateway";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.beginDeleteAndWait(resourceGroupName, natGatewayName);
  console.log(result);
}

async function main() {
  await deleteNatGateway();
}

main().catch(console.error);
