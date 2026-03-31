// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts the specified application gateway.
 *
 * @summary starts the specified application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayStart.json
 */
async function startApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.applicationGateways.start("rg1", "appgw");
}

async function main() {
  await startApplicationGateway();
}

main().catch(console.error);
