// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified application gateway.
 *
 * @summary gets the specified application gateway.
 * x-ms-original-file: 2026-01-01/ApplicationGatewayGet.json
 */
async function getApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.get("rg1", "appgw");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified application gateway.
 *
 * @summary gets the specified application gateway.
 * x-ms-original-file: 2026-01-01/ApplicationGatewayGetBasicV2.json
 */
async function getBasicV2ApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.get("rg1", "appgw");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified application gateway.
 *
 * @summary gets the specified application gateway.
 * x-ms-original-file: 2026-01-01/ApplicationGatewayGetBasicWafV2.json
 */
async function getBasicWAFV2ApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.get("rg1", "appgw");
  console.log(result);
}

async function main() {
  await getApplicationGateway();
  await getBasicV2ApplicationGateway();
  await getBasicWAFV2ApplicationGateway();
}

main().catch(console.error);
