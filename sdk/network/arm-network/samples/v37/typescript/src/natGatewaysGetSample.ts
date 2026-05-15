// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified nat gateway in a specified resource group.
 *
 * @summary gets the specified nat gateway in a specified resource group.
 * x-ms-original-file: 2025-05-01/NatGatewayGet.json
 */
async function getNatGateway(): Promise<void> {
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
async function getNatGatewayWithStandardV2Sku(): Promise<void> {
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
async function getNatGatewayWithServiceGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get("rg1", "test-natGateway");
  console.log(result);
}

async function main(): Promise<void> {
  await getNatGateway();
  await getNatGatewayWithStandardV2Sku();
  await getNatGatewayWithServiceGateway();
}

main().catch(console.error);
