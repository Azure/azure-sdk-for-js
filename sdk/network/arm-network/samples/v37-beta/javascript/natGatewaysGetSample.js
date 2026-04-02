// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified nat gateway in a specified resource group.
 *
 * @summary gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: 2025-05-01/NatGatewayGet.json
 */
async function getNatGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get("rg1", "test-natGateway");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified nat gateway in a specified resource group.
 *
 * @summary gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: 2025-05-01/NatGatewayGetStandardV2Sku.json
 */
async function getNatGatewayWithStandardV2Sku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get("rg1", "test-natGateway");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified nat gateway in a specified resource group.
 *
 * @summary gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: 2025-05-01/NatGatewayWithServiceGatewayGet.json
 */
async function getNatGatewayWithServiceGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get("rg1", "test-natGateway");
  console.log(result);
}

async function main() {
  await getNatGateway();
  await getNatGatewayWithStandardV2Sku();
  await getNatGatewayWithServiceGateway();
}

main().catch(console.error);
