// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified nat gateway in a specified resource group.
 *
 * @summary Gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatGatewayGet.json
 */
async function getNatGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const natGatewayName = "test-natGateway";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get(resourceGroupName, natGatewayName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified nat gateway in a specified resource group.
 *
 * @summary Gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatGatewayGetStandardV2Sku.json
 */
async function getNatGatewayWithStandardV2Sku() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const natGatewayName = "test-natGateway";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get(resourceGroupName, natGatewayName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified nat gateway in a specified resource group.
 *
 * @summary Gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatGatewayWithServiceGatewayGet.json
 */
async function getNatGatewayWithServiceGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const natGatewayName = "test-natGateway";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get(resourceGroupName, natGatewayName);
  console.log(result);
}

async function main() {
  await getNatGateway();
  await getNatGatewayWithStandardV2Sku();
  await getNatGatewayWithServiceGateway();
}

main().catch(console.error);
